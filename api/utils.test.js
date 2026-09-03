import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

import { getGroqApiKey, getGroqModel } from './utils.js';

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

test('getGroqModel uses a supported default and allows an explicit override', () => {
  assert.equal(getGroqModel({}), 'openai/gpt-oss-120b');
  assert.equal(getGroqModel({ GROQ_MODEL: ' custom-model ' }), 'custom-model');
});

test('the CAFS deck excludes Individuals and Work from every learning mode', async () => {
  const context = vm.createContext({ SUBJECTS: {} });
  for (const file of ['public/data-cafs.js', 'public/cafs-selection.js']) {
    vm.runInContext(await readFile(file, 'utf8'), context, { filename: file });
  }

  for (const collection of ['cards', 'practice', 'essay', 'mcq', 'notes']) {
    assert.equal(
      context.SUBJECTS.cafs[collection].some((item) => item.t === 'Individuals and Work'),
      false,
      `${collection} should not include Individuals and Work`
    );
  }
});
