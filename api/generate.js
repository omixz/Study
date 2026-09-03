/**
 * POST /api/generate
 * Generate a complete revision set (flashcards, practice, essay, MCQ, notes) for a topic.
 *
 * If the input matches a known HSC syllabus subject (e.g. "CAFS", "Legal Studies")
 * or a specific topic within one (e.g. "Groups and Communities"), flashcards are
 * generated deterministically at exactly one card per official "students learn to"
 * dot point, covering every dot point in scope. Practice/essay/mcq/notes still use
 * the general-purpose prompt. Anything that doesn't match the syllabus (a subject
 * we don't have dot-point data for) falls back to the original freeform behaviour.
 */
import { callGroqApi, extractJSON } from './utils.js';
import { matchSyllabusScope } from './syllabus-data.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic } = req.body || {};
  if (!topic || typeof topic !== 'string' || !topic.trim()) {
    return res.status(400).json({ error: 'Missing topic' });
  }

  try {
    const scope = matchSyllabusScope(topic);
    const parsed = scope
      ? await generateFromSyllabus(scope)
      : await generateFreeform(topic.trim());

    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
}

async function generateFreeform(topic) {
  const prompt = `You are an experienced HSC teacher and NESA exam writer. A student wants revision material for: "${topic}".

Infer the most sensible HSC subject/course this belongs to and build a compact, genuinely useful revision set in the real NESA style used in actual HSC papers and syllabus documents (no generic filler). All content must be Year 12 / HSC level only.

Respond ONLY with valid JSON, no markdown fences, no preamble, in exactly this shape:
{
 "label": "short subject/course name, e.g. 'Modern History: Russia'",
 "cards": [ { "topic": "topic name", "q": "flashcard front", "a": "flashcard back" } ],
 "practice": [ { "topic": "topic name", "type": "Short answer" or "Extended response", "marks": 3, "q": "question text", "criteria": "band descriptors as one string separated by \\n" } ],
 "essay": [ { "topic": "topic name", "part": "e.g. 'Introduction', 'Conclusion', 'Body Paragraph', 'Executive Summary'", "marks": 3, "q": "a task asking the student to write ONLY that one part of a larger essay/report/response", "criteria": "band descriptors as one string separated by \\n, ending with a note that only this part should be marked" } ],
 "mcq": [ { "topic": "topic name", "q": "question text", "options": ["a","b","c","d"], "correctIndex": 0, "explain": "one sentence" } ],
 "notes": [ { "topic": "topic name", "points": [ { "point": "short heading", "info": "1-2 sentence explanation" } ] } ]
}
Include exactly 4 options for every MCQ, each option a SHORT self-contained phrase (under 10 words) - never a truncated long sentence. Include 8 cards and 6 mcq spread across 2-3 topics, 4 practice questions (mix of marks values), 2 essay-part questions (each a different part, e.g. one introduction and one conclusion or body paragraph), and notes covering the same topics with 3-4 points each. Keep it accurate and exam-relevant, not padded.`;

  const text = await callGroqApi(prompt, 4000, 0.7);
  return extractJSON(text);
}

async function generateFromSyllabus(scope) {
  const { subjectLabel, scopeName, dotPoints } = scope;
  const label = scopeName === subjectLabel ? subjectLabel : `${subjectLabel}: ${scopeName}`;

  // Cards are generated 1:1 against the syllabus dot points (deterministic count).
  // Practice/essay/mcq/notes reuse the general-purpose generator, scoped to this subject/topic.
  const [cards, rest] = await Promise.all([
    generateSyllabusCards(subjectLabel, dotPoints),
    generateFreeform(label)
  ]);

  return {
    label,
    cards,
    practice: rest.practice || [],
    essay: rest.essay || [],
    mcq: rest.mcq || [],
    notes: rest.notes || []
  };
}

async function generateSyllabusCards(subjectLabel, dotPoints) {
  const list = dotPoints.map((p, i) => `${i + 1}. [${p.topic}] ${p.text}`).join('\n');

  const prompt = `You are an experienced HSC teacher writing revision flashcards for the NSW HSC syllabus subject "${subjectLabel}".

Below is a numbered list of official "students learn to" syllabus dot points. For EACH numbered point, write exactly ONE flashcard that directly tests that specific dot point at Year 12 / HSC level. Do not skip, merge or split any point - one flashcard per numbered point, in the same order.

${list}

Respond ONLY with valid JSON, no markdown fences, no preamble, in exactly this shape:
{ "cards": [ { "q": "flashcard front", "a": "flashcard back" } ] }
The "cards" array must contain exactly ${dotPoints.length} items, in the same order as the numbered list above. Keep each answer concise (1-3 sentences) and accurate to the real NESA syllabus.`;

  const maxTokens = Math.min(8000, 500 + dotPoints.length * 180);
  const text = await callGroqApi(prompt, maxTokens, 0.5);
  const parsed = extractJSON(text);
  const rawCards = Array.isArray(parsed.cards) ? parsed.cards : [];

  if (rawCards.length !== dotPoints.length) {
    throw new Error(
      `Generated ${rawCards.length} flashcards but ${dotPoints.length} syllabus points were requested - please try again.`
    );
  }

  return rawCards.map((c, i) => ({
    topic: dotPoints[i].topic,
    q: c.q,
    a: c.a
  }));
}
