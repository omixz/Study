export default async function handler(req, res) {
  if (req.method === 'GET') {
    // GET /api/user-session - retrieve user profile and seen questions
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }
    
    // Note: In production, fetch from database
    // For now, client maintains all tracking in localStorage
    return res.status(200).json({
      message: 'User session tracking is handled client-side via localStorage',
      userId
    });
  }
  
  if (req.method === 'POST') {
    // POST /api/user-session - record question seen
    const { userId, mode, subject, questionId } = req.body;
    if (!userId || !mode || !subject || !questionId) {
      return res.status(400).json({ error: 'Missing required fields: userId, mode, subject, questionId' });
    }
    
    // Note: In production, update database with seen question
    // For now, client handles tracking via localStorage
    return res.status(200).json({
      message: 'Question tracking recorded',
      userId,
      recorded: { mode, subject, questionId }
    });
  }
  
  res.status(405).json({ error: 'Method not allowed' });
}
