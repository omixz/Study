/**
 * POST /api/question
 * Generate a practice question (mode: "practice", one question per call) or a
 * batch of MCQs (mode: "mcq", 6 questions per call - matches the "Generate a
 * new HSC-style question" button in the Quiz tab, one click = 6 new questions).
 *
 * Avoiding repeats: the caller sends `existingQuestions` - the actual text of
 * questions already generated for this subject/topic (not just a count or an
 * opaque id) - so the model has real content to avoid duplicating. This is
 * combined with server-side dedup against that same list, and (for mcq mode)
 * dedup within the new batch itself, as a hard backstop in case the model
 * still repeats something despite the instruction.
 */
import { callGroqApi, extractJSON } from './utils.js';

function normalise(q) {
  return (q || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subject, topic, mode, existingQuestions } = req.body || {};
  if (!subject || !topic || (mode !== 'practice' && mode !== 'mcq')) {
    return res.status(400).json({ error: 'Missing subject, topic, or invalid mode' });
  }

  const existing = Array.isArray(existingQuestions) ? existingQuestions.filter(Boolean) : [];
  // Cap how many we quote back into the prompt so it doesn't grow unbounded after many clicks.
  const existingSample = existing.slice(-30);
  const existingSet = new Set(existing.map(normalise));

  const seenContext = existingSample.length > 0
    ? `\n\nThe student has ALREADY been asked the following question(s) on this topic - do NOT repeat any of them, and do NOT write a close variant of any of them (same fact tested with only the wording changed). Test a genuinely different aspect or angle of "${topic}" instead:\n${existingSample.map((q, i) => `${i + 1}. ${q}`).join('\n')}`
    : '';

  try {
    if (mode === 'practice') {
      const prompt = `You are an experienced NESA HSC exam writer for the subject "${subject}", topic "${topic}".
Write ONE original, exam-style HSC practice question for this topic, in the real style and phrasing NESA uses in actual HSC papers (not a generic template). Choose an appropriate mark value (3, 4, 6 or 8) and write detailed marking criteria in the real NESA band-descriptor style used in marking guidelines.${seenContext}

Respond ONLY with valid JSON, no markdown fences, no preamble, in exactly this shape:
{
 "type": "Short answer" or "Extended response",
 "marks": <number>,
 "q": "the question text",
 "criteria": "band descriptors as a single string, separated by \\n, e.g. '4 marks: ...\\n2-3 marks: ...\\n1 mark: ...'"
}`;

      // Try once, and retry a couple of times if the model repeats something already asked.
      let parsed = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        const text = await callGroqApi(prompt, 700, 0.9 + attempt * 0.05);
        const candidate = extractJSON(text);
        if (!existingSet.has(normalise(candidate.q))) {
          parsed = candidate;
          break;
        }
      }
      if (!parsed) {
        throw new Error('Could not generate a new, non-repeated question after several attempts - please try again.');
      }
      parsed.topic = topic;
      return res.status(200).json(parsed);
    }

    // mode === 'mcq': generate 6 distinct questions in one call, then dedup against
    // both the existing set and the batch itself, retrying to top back up to 6 if needed.
    let mcqs = [];
    for (let attempt = 0; attempt < 3 && mcqs.length < 6; attempt++) {
      const stillNeeded = 6 - mcqs.length;
      const prompt = `You are an experienced NESA HSC exam writer for the subject "${subject}", topic "${topic}".
Write ${stillNeeded} original, exam-style multiple-choice question(s) for this topic, in the real style NESA uses in actual HSC papers. Each must test a genuinely different aspect or angle of "${topic}" from EACH OTHER - no two of these questions should overlap in what they test. Each must have exactly 4 options, only one correct. Each option must be a SHORT self-contained phrase (under 10 words).${seenContext}

Respond ONLY with valid JSON, no markdown fences, no preamble, in exactly this shape:
{ "mcqs": [ { "q": "the question text", "options": ["option A", "option B", "option C", "option D"], "correctIndex": <0-3, index of the correct option>, "explain": "one sentence explaining why the correct answer is correct" } ] }
The "mcqs" array must contain exactly ${stillNeeded} item(s).`;

      const text = await callGroqApi(prompt, 2500, 0.85 + attempt * 0.05);
      const parsed = extractJSON(text);
      const batch = Array.isArray(parsed.mcqs) ? parsed.mcqs : [];

      const seenThisRound = new Set([...existingSet, ...mcqs.map((m) => normalise(m.q))]);
      for (const m of batch) {
        const key = normalise(m.q);
        if (!seenThisRound.has(key)) {
          mcqs.push(m);
          seenThisRound.add(key);
        }
      }
    }

    if (mcqs.length === 0) {
      throw new Error('Could not generate any new, non-repeated questions after several attempts - please try again.');
    }

    res.status(200).json({ mcqs: mcqs.slice(0, 6).map((m) => ({ ...m, topic })) });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
