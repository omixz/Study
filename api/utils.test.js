import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

import { getGroqApiKey } from './utils.js';

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

test('every checked-in syllabus dot point has an immediately available flashcard', async () => {
  const context = vm.createContext({ SUBJECTS: {} });
  const files = [
    'public/hsc-syllabus-data.js',
    'public/data-cafs.js',
    'public/data-business.js',
    'public/data-legal.js',
    'public/data-english.js',
    'public/syllabus-flashcards.js'
  ];
  for (const file of files) {
    vm.runInContext(await readFile(file, 'utf8'), context, { filename: file });
  }

  const syllabusData = vm.runInContext('HSC_SYLLABUS', context);
  for (const [subjectKey, syllabus] of Object.entries(syllabusData)) {
    const expected = Object.values(syllabus.topics).flat().length;
    const cards = context.SUBJECTS[subjectKey].cards.filter((card) => card.syllabusCard);
    assert.equal(cards.length, expected, `${subjectKey} should cover every dot point`);
  }
});
