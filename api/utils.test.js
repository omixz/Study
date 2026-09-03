import assert from 'node:assert/strict';
import test from 'node:test';

import { getGroqApiKey } from './utils.js';
import { validateFlashcards } from './flashcards.js';

test('getGroqApiKey prefers the canonical Groq environment variable', () => {
  assert.equal(
    getGroqApiKey({ GROQ_API_KEY: ' canonical-key ', GROQ_KEY: 'legacy-key' }),
    'canonical-key'
  );
});

test('getGroqApiKey supports legacy environment variable names', () => {
  assert.equal(getGroqApiKey({ GROQ_KEY: 'legacy-key' }), 'legacy-key');
  assert.equal(getGroqApiKey({ GroqAPI: 'older-key' }), 'older-key');
});

test('getGroqApiKey ignores empty values', () => {
  assert.equal(getGroqApiKey({ GROQ_API_KEY: '   ', GroqApi: 'usable-key' }), 'usable-key');
  assert.equal(getGroqApiKey({ GROQ_API_KEY: '' }), undefined);
});

test('validateFlashcards returns cards in syllabus order and requires every dot point', () => {
  const dotPoints = [
    { id: 'business-Finance-0', topic: 'Finance', text: 'Analyse budgeting' },
    { id: 'business-Finance-1', topic: 'Finance', text: 'Examine cash flow' }
  ];
  const cards = validateFlashcards([
    { id: 'business-Finance-1', topic: 'Finance', q: 'What is cash flow?', a: 'Money in and out.' },
    { id: 'business-Finance-0', topic: 'Finance', q: 'Why budget?', a: 'To plan resources.' }
  ], dotPoints);
  assert.deepEqual(cards.map((card) => card.id), ['business-Finance-0', 'business-Finance-1']);
  assert.throws(
    () => validateFlashcards(cards.slice(0, 1), dotPoints),
    /missed 1 syllabus dot point/
  );
});
