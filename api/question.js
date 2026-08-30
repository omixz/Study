/**
 * POST /api/question
 * Generate a single practice question or MCQ for a given subject and topic.
 */
import { callGroqApi, extractJSON } from './utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subject, topic, mode } = req.body || {};
  if (!subject || !topic || (mode !== 'practice' && mode !== 'mcq')) {
    return res.status(400).json({ error: 'Missing subject, topic, or invalid mode' });
  }

  try {
    const prompt =
      mode === 'practice'
        ? `You are an experienced NESA HSC exam writer for the subject "${subject}", topic "${topic}".
Write ONE original, exam-style HSC practice question for this topic, in the real style and phrasing NESA uses in actual HSC papers (not a generic template). Choose an appropriate mark value (3, 4, 6 or 8) and write detailed marking criteria in the real NESA band-descriptor style used in marking guidelines.

Respond ONLY with valid JSON, no markdown fences, no preamble, in exactly this shape:
{
 "type": "Short answer" or "Extended response",
 "marks": <number>,
 "q": "the question text",
 "criteria": "band descriptors as a single string, separated by \\n, e.g. '4 marks: ...\\n2-3 marks: ...\\n1 mark: ...'"
}`
        : `You are an experienced NESA HSC exam writer for the subject "${subject}", topic "${topic}".
Write ONE original, exam-style multiple-choice question for this topic, in the real style NESA uses in actual HSC papers. It must have exactly 4 options, only one correct. Each option must be a SHORT self-contained phrase (under 10 words).

Respond ONLY with valid JSON, no markdown fences, no preamble, in exactly this shape:
{
 "q": "the question text",
 "options": ["option A", "option B", "option C", "option D"],
 "correctIndex": <0-3, index of the correct option>,
 "explain": "one sentence explaining why the correct answer is correct"
}`;

    const text = await callGroqApi(
      prompt,
      mode === 'practice' ? 700 : 500,
      0.9
    );
    const parsed = extractJSON(text);

    if (mode === 'practice') {
      parsed.topic = topic;
    }

    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
