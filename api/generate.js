/**
 * POST /api/generate
 * Generate a complete revision set (flashcards, practice, essay, MCQ, notes) for a topic.
 *
 * If the input matches a known HSC syllabus subject (e.g. "CAFS", "Legal Studies")
 * or a specific topic within one (e.g. "Groups and Communities"):
 *  - flashcards and practice questions are generated deterministically at exactly
 *    one item per official "students learn to" dot point, covering every topic
 *    in scope (not sampled to a couple of topics).
 *  - mcq is a fixed set of 6 HSC-style questions, but drawn from and grounded in
 *    that same full list of dot points spanning every topic in scope, rather than
 *    the freeform generator's default of sampling only 2-3 topics.
 *  - essay/notes still use the general-purpose prompt (an essay-part task and a
 *    notes summary don't map 1:1 to a single dot point the way a flashcard, a
 *    practice question or an MCQ does).
 * Anything that doesn't match the syllabus (a subject we don't have dot-point
 * data for) falls back to the original freeform behaviour for everything.
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

/**
 * @param {string} topic
 * @param {string[]} [only] - if provided, restricts the requested JSON shape to just
 *   these fields (used when cards/practice are already covered by the syllabus-scoped
 *   generators, so we don't waste tokens/quality asking the model to also produce them).
 */
async function generateFreeform(topic, only) {
  const fields = {
    label: `"label": "short subject/course name, e.g. 'Modern History: Russia'",`,
    cards: `"cards": [ { "topic": "topic name", "q": "flashcard front", "a": "flashcard back" } ],`,
    practice: `"practice": [ { "topic": "topic name", "type": "Short answer" or "Extended response", "marks": 3, "q": "question text", "criteria": "band descriptors as one string separated by \\n" } ],`,
    essay: `"essay": [ { "topic": "topic name", "part": "e.g. 'Introduction', 'Conclusion', 'Body Paragraph', 'Executive Summary'", "marks": 3, "q": "a task asking the student to write ONLY that one part of a larger essay/report/response", "criteria": "band descriptors as one string separated by \\n, ending with a note that only this part should be marked" } ],`,
    mcq: `"mcq": [ { "topic": "topic name", "q": "question text", "options": ["a","b","c","d"], "correctIndex": 0, "explain": "one sentence" } ],`,
    notes: `"notes": [ { "topic": "topic name", "points": [ { "point": "short heading", "info": "1-2 sentence explanation" } ] } ]`
  };
  const wanted = only && only.length ? ['label', ...only] : Object.keys(fields);
  const shape = wanted.map((k) => fields[k]).join('\n ').replace(/,$/, '');

  const instructions = [];
  if (wanted.includes('cards')) instructions.push('8 cards spread across 2-3 topics');
  if (wanted.includes('mcq')) instructions.push('6 mcq spread across 2-3 topics');
  if (wanted.includes('practice')) instructions.push('4 practice questions (mix of marks values)');
  if (wanted.includes('essay')) instructions.push('2 essay-part questions (each a different part, e.g. one introduction and one conclusion or body paragraph)');
  if (wanted.includes('notes')) instructions.push('notes covering the same topics with 3-4 points each');

  const prompt = `You are an experienced HSC teacher and NESA exam writer. A student wants revision material for: "${topic}".

Infer the most sensible HSC subject/course this belongs to and build a compact, genuinely useful revision set in the real NESA style used in actual HSC papers and syllabus documents (no generic filler). All content must be Year 12 / HSC level only.

Respond ONLY with valid JSON, no markdown fences, no preamble, in exactly this shape:
{
 ${shape}
}
${wanted.includes('mcq') ? 'Include exactly 4 options for every MCQ, each option a SHORT self-contained phrase (under 10 words) - never a truncated long sentence. ' : ''}Include ${instructions.join(', ')}. Keep it accurate and exam-relevant, not padded.`;

  const text = await callGroqApi(prompt, 4000, 0.7);
  return extractJSON(text);
}

async function generateFromSyllabus(scope) {
  const { subjectLabel, scopeName, dotPoints } = scope;
  const label = scopeName === subjectLabel ? subjectLabel : `${subjectLabel}: ${scopeName}`;

  // Cards and practice questions are both generated 1:1 against the syllabus dot
  // points - one of each per point, deterministic count. MCQ is a fixed set of 6,
  // grounded in the same dot-point list but spanning the whole scope rather than
  // 1:1. Essay/notes reuse the general-purpose generator (trimmed to just those
  // fields), scoped to this subject/topic.
  const [cards, practice, mcq, rest] = await Promise.all([
    generateSyllabusCards(subjectLabel, dotPoints),
    generateSyllabusPractice(subjectLabel, dotPoints),
    generateSyllabusMcq(subjectLabel, dotPoints),
    generateFreeform(label, ['essay', 'notes'])
  ]);

  return {
    label,
    cards,
    practice,
    mcq,
    essay: rest.essay || [],
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

async function generateSyllabusPractice(subjectLabel, dotPoints) {
  const list = dotPoints.map((p, i) => `${i + 1}. [${p.topic}] ${p.text}`).join('\n');

  const prompt = `You are an experienced HSC teacher and NESA exam writer setting practice questions for the NSW HSC syllabus subject "${subjectLabel}".

Below is a numbered list of official "students learn to" syllabus dot points. For EACH numbered point, write exactly ONE exam-style practice question that directly tests that specific dot point at Year 12 / HSC level - pick "Short answer" (2-3 marks) for simpler recall/explain points and "Extended response" (4-8 marks) for more analytical/evaluative points, whichever genuinely fits that point. Do not skip, merge or split any point - one question per numbered point, in the same order.

${list}

Respond ONLY with valid JSON, no markdown fences, no preamble, in exactly this shape:
{ "practice": [ { "type": "Short answer" or "Extended response", "marks": 3, "q": "question text", "criteria": "band descriptors as one string separated by \\n" } ] }
The "practice" array must contain exactly ${dotPoints.length} items, in the same order as the numbered list above. Keep marks realistic for real NESA papers and criteria genuinely specific to that question, not generic filler.`;

  const maxTokens = Math.min(8000, 600 + dotPoints.length * 220);
  const text = await callGroqApi(prompt, maxTokens, 0.5);
  const parsed = extractJSON(text);
  const raw = Array.isArray(parsed.practice) ? parsed.practice : [];

  if (raw.length !== dotPoints.length) {
    throw new Error(
      `Generated ${raw.length} practice questions but ${dotPoints.length} syllabus points were requested - please try again.`
    );
  }

  return raw.map((p, i) => ({
    topic: dotPoints[i].topic,
    type: p.type,
    marks: p.marks,
    q: p.q,
    criteria: p.criteria
  }));
}

async function generateSyllabusMcq(subjectLabel, dotPoints) {
  const list = dotPoints.map((p, i) => `${i + 1}. [${p.topic}] ${p.text}`).join('\n');
  const topicCount = new Set(dotPoints.map((p) => p.topic)).size;

  const prompt = `You are an experienced HSC teacher and NESA exam writer setting multiple-choice questions for the NSW HSC syllabus subject "${subjectLabel}".

Below is the full numbered list of official "students learn to" syllabus dot points for this subject/topic.

${list}

Write exactly 6 exam-style multiple-choice questions at Year 12 / HSC level. Each question must be clearly grounded in one of the numbered dot points above (pick 6 different, well-spread points - do not cluster them all in one topic). Spread the 6 questions across as many of the ${topicCount} topic(s) listed as sensibly possible.

Respond ONLY with valid JSON, no markdown fences, no preamble, in exactly this shape:
{ "mcq": [ { "topic": "topic name", "q": "question text", "options": ["a","b","c","d"], "correctIndex": 0, "explain": "one sentence" } ] }
The "mcq" array must contain exactly 6 items. Include exactly 4 options per question, each a SHORT self-contained phrase (under 10 words) - never a truncated long sentence. "topic" must exactly match one of the topic names in the numbered list above.`;

  const text = await callGroqApi(prompt, 2500, 0.6);
  const parsed = extractJSON(text);
  const raw = Array.isArray(parsed.mcq) ? parsed.mcq : [];

  if (raw.length !== 6) {
    throw new Error(`Generated ${raw.length} MCQ questions but 6 were requested - please try again.`);
  }

  return raw;
}
