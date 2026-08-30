/**
 * POST /api/mark
 * Mark a student's response using the Groq API based on a marking prompt.
 */
import { callGroqApi } from './utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  try {
    const text = await callGroqApi(prompt, 1000, 0.7);
    res.status(200).json({ text: text || '' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
