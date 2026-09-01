/**
 * Shared utility to get Groq API key from environment variables.
 * Checks multiple possible env var names for flexibility.
 */
export function getGroqApiKey() {
  return process.env.GROQ_API_KEY || process.env.GroqAPI || process.env.GroqApi;
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
    throw new Error('Generation is not configured yet - missing GROQ_API_KEY env var.');
  }

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: maxTokens,
      temperature: temperature,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await res.json();
  if (!res.ok) {
    const errorMsg =
      data?.error?.message || 'Groq API error';
    throw new Error(errorMsg);
  }

  const text = data?.choices?.[0]?.message?.content || '';
  return text;
}
