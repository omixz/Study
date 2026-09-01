/**
 * POST /api/progress
 * Save and retrieve syllabus dot point progress
 */

const progressStore = new Map(); // In-memory store; use DB in production

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { subject } = req.query;
    if (!subject) {
      return res.status(400).json({ error: 'Missing subject query parameter' });
    }

    const key = `progress:${subject}`;
    const progress = progressStore.get(key) || {};
    res.status(200).json(progress);
  } else if (req.method === 'POST') {
    const { subject, dotPointId, status } = req.body;
    if (!subject || !dotPointId || !['red', 'orange', 'green'].includes(status)) {
      return res.status(400).json({ error: 'Missing or invalid subject, dotPointId, or status' });
    }

    const key = `progress:${subject}`;
    const progress = progressStore.get(key) || {};
    progress[dotPointId] = status;
    progressStore.set(key, progress);

    res.status(200).json({ success: true, progress });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
