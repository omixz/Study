/**
 * POST /api/question
 * Generate a practice question (mode: "practice", one question per call) or a
 * batch of MCQs (mode: "mcq", 6 questions per call - matches the "Generate a
 * new HSC-style question" button in the Quiz tab, one click = 6 new questions).
 */
import { callGroqApi, extractJSON } from './utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subject, topic, mode, userId, seenQuestionIds } = req.body || {};
  if (!subject || !topic || (mode !== 'practice' && mode !== 'mcq')) {
    return res.status(400).json({ error: 'Missing subject, topic, or invalid mode' });
  }

  try {
    const seenContext = seenQuestionIds && seenQuestionIds.length > 0
      ? `\n\nIMPORTANT: The student has already seen ${seenQuestionIds.length} question(s) on this topic. Generate COMPLETELY DIFFERENT question(s) that test a different aspect or angle of "${topic}". Do NOT repeat concepts from previously seen questions.`
      : '';

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

      const text = await callGroqApi(prompt, 700, 0.9);
      const parsed = extractJSON(text);
      parsed.topic = topic;
      return res.status(200).json(parsed);
    }

    // mode === 'mcq': generate 6 distinct questions in one call
    const prompt = `You are an experienced NESA HSC exam writer for the subject "${subject}", topic "${topic}".
Write 6 original, exam-style multiple-choice questions for this topic, in the real style NESA uses in actual HSC papers. Each must test a genuinely different aspect or angle of "${topic}" - no two questions should overlap in what they test. Each must have exactly 4 options, only one correct. Each option must be a SHORT self-contained phrase (under 10 words).${seenContext}

Respond ONLY with valid JSON, no markdown fences, no preamble, in exactly this shape:
{ "mcqs": [ { "q": "the question text", "options": ["option A", "option B", "option C", "option D"], "correctIndex": <0-3, index of the correct option>, "explain": "one sentence explaining why the correct answer is correct" } ] }
The "mcqs" array must contain exactly 6 items, each testing a different aspect of the topic.`;

    const text = await callGroqApi(prompt, 2500, 0.9);
    const parsed = extractJSON(text);
    const mcqs = Array.isArray(parsed.mcqs) ? parsed.mcqs : [];

    if (mcqs.length !== 6) {
      throw new Error(`Generated ${mcqs.length} questions but 6 were requested - please try again.`);
    }

    res.status(200).json({ mcqs: mcqs.map((m) => ({ ...m, topic })) });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
