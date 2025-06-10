import express from 'express';
import { DatabaseManager } from '../database/DatabaseManager.js';

const router = express.Router();
const db = new DatabaseManager();

// Run agent simulation
router.post('/run', async (req, res) => {
  try {
    const { trackId, inputData } = req.body;

    if (!trackId || !inputData) {
      return res.status(400).json({ error: 'Track ID and input data required' });
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate mock results based on track
    const results = generateSimulationResults(trackId, inputData);

    // Save simulation (if user is authenticated)
    if (req.user) {
      await db.run(
        `INSERT INTO agent_simulations 
         (user_id, track_id, input_data, output_data, confidence_score, processing_time) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          req.user.userId,
          trackId,
          JSON.stringify(inputData),
          JSON.stringify(results),
          results.confidence,
          results.processingTime
        ]
      );
    }

    res.json({
      success: true,
      trackId,
      results
    });
  } catch (error) {
    console.error('Simulation error:', error);
    res.status(500).json({ error: 'Simulation failed' });
  }
});

// Get simulation templates
router.get('/templates/:trackId', (req, res) => {
  const trackId = parseInt(req.params.trackId);
  const template = getSimulationTemplate(trackId);
  
  if (!template) {
    return res.status(404).json({ error: 'Template not found' });
  }
  
  res.json({ template });
});

function generateSimulationResults(trackId: number, inputData: any) {
  const baseScore = 70 + Math.random() * 25;
  const processingTime = 800 + Math.random() * 1200;
  
  const results = {
    score: Math.round(baseScore * 100) / 100,
    confidence: Math.round((85 + Math.random() * 10) * 100) / 100,
    processingTime: Math.round(processingTime),
    metrics: generateTrackSpecificMetrics(trackId),
    insights: generateInsights(trackId, baseScore),
    recommendations: generateRecommendations(trackId, baseScore)
  };

  return results;
}

function generateTrackSpecificMetrics(trackId: number) {
  switch (trackId) {
    case 1: // Identity Model
      return {
        trustScore: Math.round((75 + Math.random() * 20) * 100) / 100,
        sybilRisk: Math.round((Math.random() * 30) * 100) / 100,
        reputationStrength: Math.round((80 + Math.random() * 15) * 100) / 100,
        verificationLevel: Math.round((85 + Math.random() * 10) * 100) / 100
      };
    case 2: // Pitch Strength
      return {
        narrativeClarity: Math.round((78 + Math.random() * 18) * 100) / 100,
        marketFit: Math.round((72 + Math.random() * 23) * 100) / 100,
        teamStrength: Math.round((81 + Math.random() * 14) * 100) / 100,
        originalityScore: Math.round((76 + Math.random() * 19) * 100) / 100
      };
    case 3: // Fundraise Prediction
      return {
        successProbability: Math.round((68 + Math.random() * 27) * 100) / 100,
        marketTiming: Math.round((74 + Math.random() * 21) * 100) / 100,
        founderCredibility: Math.round((79 + Math.random() * 16) * 100) / 100,
        tractionScore: Math.round((73 + Math.random() * 22) * 100) / 100
      };
    default:
      return {
        overallScore: Math.round((75 + Math.random() * 20) * 100) / 100,
        dataQuality: Math.round((82 + Math.random() * 13) * 100) / 100,
        algorithmConfidence: Math.round((88 + Math.random() * 8) * 100) / 100
      };
  }
}

function generateInsights(trackId: number, score: number): string[] {
  const insights = [];
  
  if (score > 85) {
    insights.push("Exceptional performance across key metrics");
    insights.push("Strong indicators for successful fundraising");
  } else if (score > 70) {
    insights.push("Good foundation with room for improvement");
    insights.push("Several positive signals detected");
  } else {
    insights.push("Areas requiring attention identified");
    insights.push("Consider strengthening core fundamentals");
  }

  // Track-specific insights
  switch (trackId) {
    case 1:
      insights.push("Onchain reputation signals are strong");
      break;
    case 2:
      insights.push("Narrative structure shows clarity");
      break;
    case 3:
      insights.push("Market conditions appear favorable");
      break;
  }

  return insights;
}

function generateRecommendations(trackId: number, score: number): string[] {
  const recommendations = [];
  
  if (score < 75) {
    recommendations.push("Focus on strengthening core value proposition");
    recommendations.push("Increase community engagement and visibility");
  }
  
  if (score < 60) {
    recommendations.push("Consider pivoting strategy or timing");
    recommendations.push("Seek mentorship and advisory support");
  }

  // Track-specific recommendations
  switch (trackId) {
    case 1:
      recommendations.push("Enhance onchain activity and contributions");
      break;
    case 2:
      recommendations.push("Refine pitch narrative and structure");
      break;
    case 3:
      recommendations.push("Build stronger traction metrics");
      break;
  }

  return recommendations;
}

function getSimulationTemplate(trackId: number) {
  const templates = {
    1: {
      name: "Identity Model Template",
      fields: [
        { name: "walletAddress", type: "text", required: true, placeholder: "0x..." },
        { name: "githubProfile", type: "text", required: false, placeholder: "github.com/username" },
        { name: "linkedinProfile", type: "text", required: false, placeholder: "linkedin.com/in/username" },
        { name: "twitterHandle", type: "text", required: false, placeholder: "@username" }
      ]
    },
    2: {
      name: "Pitch Strength Template",
      fields: [
        { name: "pitchText", type: "textarea", required: true, placeholder: "Enter your pitch..." },
        { name: "problemStatement", type: "textarea", required: true, placeholder: "What problem are you solving?" },
        { name: "solution", type: "textarea", required: true, placeholder: "How do you solve it?" },
        { name: "marketSize", type: "text", required: false, placeholder: "Target market size" }
      ]
    },
    3: {
      name: "Fundraise Prediction Template",
      fields: [
        { name: "fundingGoal", type: "number", required: true, placeholder: "Target funding amount" },
        { name: "currentTraction", type: "textarea", required: true, placeholder: "Current metrics and traction" },
        { name: "teamSize", type: "number", required: true, placeholder: "Number of team members" },
        { name: "previousFunding", type: "number", required: false, placeholder: "Previous funding raised" }
      ]
    }
  };

  return templates[trackId as keyof typeof templates] || null;
}

export { router as simulationRoutes };