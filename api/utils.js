/**
 * Shared utilities for the Groq-backed AI endpoints.
 *
 * The application has previously used more than one name for its Groq secret.
 * Keep the canonical GROQ_API_KEY name first, while accepting the legacy names
 * so an existing deployment does not silently lose access to its configured key.
 */
const GROQ_KEY_ENV_VARS = [
  'GROQ_API_KEY',
  'GROQ_APIKEY',
  'GROQ_KEY',
  'GroqAPI',
  'GroqApi'
];

// llama-3.3-70b-versatile has been retired by Groq. This current production
// model is used unless a deployment supplies its own GROQ_MODEL override.
const DEFAULT_GROQ_MODEL = 'openai/gpt-oss-120b';

/** Get the configured Groq API key, ignoring empty environment values. */
export function getGroqApiKey(env = process.env) {
  for (const name of GROQ_KEY_ENV_VARS) {
    const value = env[name];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

/** Get the configured model, using a currently supported Groq default. */
export function getGroqModel(env = process.env) {
  return typeof env.GROQ_MODEL === 'string' && env.GROQ_MODEL.trim()
    ? env.GROQ_MODEL.trim()
    : DEFAULT_GROQ_MODEL;
}

/**
 * Shared utility to extract JSON from text that may contain markdown fences.
 */
export function extractJSON(text) {
  const cleaned = text.replace(/```json|```/g, '').trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Unexpected response format from the model.');
  return JSON.parse(match[0]);
}

/**
 * Call Groq API with consistent error handling.
 */
export async function callGroqApi(prompt, maxTokens = 700, temperature = 0.7) {
  const apiKey = getGroqApiKey();
  if (!apiKey) {
    throw new Error(
      `Generation is not configured yet. Set one of: ${GROQ_KEY_ENV_VARS.join(', ')}.`
    );
  }

  const model = getGroqModel();
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      temperature,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('Groq returned an invalid response. Please try again.');
  }

  if (!res.ok) {
    throw new Error(data?.error?.message || `Groq API error (${res.status})`);
  }

  const text = data?.choices?.[0]?.message?.content;
  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('Groq returned an empty response. Please try again.');
  }

  return text;
}
