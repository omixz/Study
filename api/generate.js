/**
 * POST /api/generate
 * Generate a complete revision set (flashcards, practice, essay, MCQ, notes) for a topic.
 */
import { callGroqApi, extractJSON } from './utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic } = req.body || {};
  if (!topic || typeof topic !== 'string' || !topic.trim()) {
    return res.status(400).json({ error: 'Missing topic' });
  }

  try {
    const prompt = `You are an experienced HSC teacher and NESA exam writer. A student wants revision material for: "${topic.trim()}".

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
    const parsed = extractJSON(text);

    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
