import express from 'express';
import { DatabaseManager } from '../database/DatabaseManager.js';
import { authenticateToken } from './auth.js';

const router = express.Router();
const db = new DatabaseManager();

// Get agent simulation history
router.get('/simulations', authenticateToken, async (req, res) => {
  try {
    const simulations = await db.query(
      `SELECT id, track_id, input_data, output_data, confidence_score, 
              processing_time, created_at 
       FROM agent_simulations 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT 50`,
      [req.user.userId]
    );

    res.json({ simulations });
  } catch (error) {
    console.error('Simulations fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch simulations' });
  }
});

// Save simulation result
router.post('/simulations', authenticateToken, async (req, res) => {
  try {
    const { trackId, inputData, outputData, confidenceScore, processingTime } = req.body;

    const result = await db.run(
      `INSERT INTO agent_simulations 
       (user_id, track_id, input_data, output_data, confidence_score, processing_time) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        req.user.userId,
        trackId,
        JSON.stringify(inputData),
        JSON.stringify(outputData),
        confidenceScore,
        processingTime
      ]
    );

    res.status(201).json({
      message: 'Simulation saved successfully',
      simulationId: result.lastID
    });
  } catch (error) {
    console.error('Simulation save error:', error);
    res.status(500).json({ error: 'Failed to save simulation' });
  }
});

// Get agent performance metrics
router.get('/metrics', async (req, res) => {
  try {
    const metrics = await db.query(`
      SELECT 
        track_id,
        COUNT(*) as total_simulations,
        AVG(confidence_score) as avg_confidence,
        AVG(processing_time) as avg_processing_time,
        MAX(confidence_score) as max_confidence
      FROM agent_simulations 
      GROUP BY track_id
    `);

    res.json({ metrics });
  } catch (error) {
    console.error('Metrics fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

// Get global agent statistics
router.get('/stats', async (req, res) => {
  try {
    const totalSimulations = await db.get(
      'SELECT COUNT(*) as count FROM agent_simulations'
    );

    const avgConfidence = await db.get(
      'SELECT AVG(confidence_score) as avg FROM agent_simulations'
    );

    const trackDistribution = await db.query(`
      SELECT track_id, COUNT(*) as count 
      FROM agent_simulations 
      GROUP BY track_id 
      ORDER BY count DESC
    `);

    const recentActivity = await db.query(`
      SELECT DATE(created_at) as date, COUNT(*) as simulations
      FROM agent_simulations 
      WHERE created_at >= datetime('now', '-30 days')
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `);

    res.json({
      totalSimulations: totalSimulations.count,
      avgConfidence: avgConfidence.avg || 0,
      trackDistribution,
      recentActivity
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export { router as agentsRoutes };