import express from 'express';
import { DatabaseManager } from '../database/DatabaseManager.js';
import { authenticateToken } from './auth.js';

const router = express.Router();
const db = new DatabaseManager();

// Register for hackathon
router.post('/register', authenticateToken, async (req, res) => {
  try {
    const { teamName, trackId, projectDescription, githubRepo } = req.body;

    if (!teamName || !trackId) {
      return res.status(400).json({ error: 'Team name and track ID required' });
    }

    // Check if user already registered
    const existing = await db.get(
      'SELECT id FROM participants WHERE user_id = ?',
      [req.user.userId]
    );

    if (existing) {
      return res.status(409).json({ error: 'Already registered for hackathon' });
    }

    const result = await db.run(
      `INSERT INTO participants 
       (user_id, team_name, track_id, project_description, github_repo) 
       VALUES (?, ?, ?, ?, ?)`,
      [req.user.userId, teamName, trackId, projectDescription, githubRepo]
    );

    res.status(201).json({
      message: 'Successfully registered for hackathon',
      participantId: result.lastID
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Get participant info
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const participant = await db.get(
      `SELECT p.*, u.username, u.email 
       FROM participants p 
       JOIN users u ON p.user_id = u.id 
       WHERE p.user_id = ?`,
      [req.user.userId]
    );

    if (!participant) {
      return res.status(404).json({ error: 'Not registered for hackathon' });
    }

    res.json({ participant });
  } catch (error) {
    console.error('Participant fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch participant info' });
  }
});

// Update submission
router.put('/submission', authenticateToken, async (req, res) => {
  try {
    const { projectDescription, githubRepo, submissionStatus } = req.body;

    const result = await db.run(
      `UPDATE participants 
       SET project_description = ?, github_repo = ?, submission_status = ?, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ?`,
      [projectDescription, githubRepo, submissionStatus || 'draft', req.user.userId]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Participant not found' });
    }

    res.json({ message: 'Submission updated successfully' });
  } catch (error) {
    console.error('Submission update error:', error);
    res.status(500).json({ error: 'Failed to update submission' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const { trackId } = req.query;

    let query = `
      SELECT 
        p.team_name,
        p.track_id,
        u.username,
        l.score,
        l.metrics,
        l.last_updated
      FROM leaderboard l
      JOIN participants p ON l.participant_id = p.id
      JOIN users u ON p.user_id = u.id
    `;

    const params: any[] = [];

    if (trackId) {
      query += ' WHERE p.track_id = ?';
      params.push(parseInt(trackId as string));
    }

    query += ' ORDER BY l.score DESC LIMIT 50';

    const leaderboard = await db.query(query, params);

    res.json({ leaderboard });
  } catch (error) {
    console.error('Leaderboard fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get hackathon statistics
router.get('/stats', async (req, res) => {
  try {
    const totalParticipants = await db.get(
      'SELECT COUNT(*) as count FROM participants'
    );

    const trackDistribution = await db.query(`
      SELECT track_id, COUNT(*) as count 
      FROM participants 
      GROUP BY track_id 
      ORDER BY count DESC
    `);

    const submissionStats = await db.query(`
      SELECT submission_status, COUNT(*) as count 
      FROM participants 
      GROUP BY submission_status
    `);

    const recentRegistrations = await db.query(`
      SELECT DATE(created_at) as date, COUNT(*) as registrations
      FROM participants 
      WHERE created_at >= datetime('now', '-7 days')
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `);

    res.json({
      totalParticipants: totalParticipants.count,
      trackDistribution,
      submissionStats,
      recentRegistrations
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export { router as participantsRoutes };