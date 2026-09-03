/**
 * POST /api/flashcards
 * Generate one syllabus-aligned flashcard for every supplied syllabus dot point.
 */
import { callGroqApi, extractJSON } from './utils.js';

export function validateFlashcards(cards, dotPoints) {
  if (!Array.isArray(cards)) {
    throw new Error('The model did not return a flashcard list.');
  }

  const requestedPoints = new Map(dotPoints.map((point) => [point.id, point]));
  const cardsById = new Map();

  for (const card of cards) {
    if (
      !card ||
      !requestedPoints.has(card.id) ||
      cardsById.has(card.id) ||
      typeof card.topic !== 'string' ||
      !card.topic.trim() ||
      typeof card.q !== 'string' ||
      !card.q.trim() ||
      typeof card.a !== 'string' ||
      !card.a.trim()
    ) {
      continue;
    }
    if (card.topic.trim() !== requestedPoints.get(card.id).topic) {
      continue;
    }
    cardsById.set(card.id, {
      id: card.id,
      topic: card.topic.trim(),
      q: card.q.trim(),
      a: card.a.trim()
    });
  }

  const missingIds = dotPoints
    .filter((point) => !cardsById.has(point.id))
    .map((point) => point.id);
  if (missingIds.length) {
    throw new Error(`The model missed ${missingIds.length} syllabus dot point(s). Please try again.`);
  }

  return dotPoints.map((point) => cardsById.get(point.id));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subject, dotPoints } = req.body || {};
  if (
    typeof subject !== 'string' ||
    !subject.trim() ||
    !Array.isArray(dotPoints) ||
    dotPoints.length === 0 ||
    dotPoints.length > 50 ||
    dotPoints.some((point) =>
      !point || typeof point.id !== 'string' || typeof point.topic !== 'string' || typeof point.text !== 'string'
    )
  ) {
    return res.status(400).json({ error: 'Provide a subject and 1–50 valid syllabus dot points.' });
  }

  const syllabus = dotPoints.map((point) => ({
    id: point.id,
    topic: point.topic,
    dotPoint: point.text
  }));
  const prompt = `You are an experienced HSC teacher. Create exactly ONE accurate, self-contained revision flashcard for EVERY syllabus dot point below for ${subject}.

Each question must test the named dot point directly. Each answer must be concise (1–3 sentences), specific enough to revise from, and appropriate for HSC students. Do not omit, combine, rename, or add dot points.

SYLLABUS DOT POINTS:
${JSON.stringify(syllabus)}

Respond ONLY with valid JSON in exactly this shape:
{"cards":[{"id":"the supplied id","topic":"the supplied topic","q":"question","a":"answer"}]}`;

  try {
    const text = await callGroqApi(prompt, Math.min(6000, Math.max(1400, dotPoints.length * 180)), 0.3);
    const parsed = extractJSON(text);
    const cards = validateFlashcards(parsed.cards, dotPoints);
    return res.status(200).json({ cards });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Unable to generate syllabus flashcards.' });
  }
}
