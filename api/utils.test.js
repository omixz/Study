import assert from 'node:assert/strict';
import test from 'node:test';

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
