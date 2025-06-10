import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';

interface SimulationRequest {
  type: 'simulate';
  trackId: number;
  inputData: any;
  sessionId?: string;
}

interface AgentMetrics {
  trustScore: number;
  pitchStrength: number;
  investorMatch: number;
  momentum: number;
  socialTrust: number;
  fundraisePrediction: number;
  partnerImpact: number;
}

export class AgentSimulator {
  private wss: WebSocketServer;
  private activeSessions: Map<string, WebSocket> = new Map();

  constructor(wss: WebSocketServer) {
    this.wss = wss;
  }

  handleMessage(ws: WebSocket, data: any) {
    switch (data.type) {
      case 'simulate':
        this.runSimulation(ws, data as SimulationRequest);
        break;
      case 'subscribe':
        this.subscribeToUpdates(ws, data.sessionId);
        break;
      default:
        ws.send(JSON.stringify({ error: 'Unknown message type' }));
    }
  }

  private async runSimulation(ws: WebSocket, request: SimulationRequest) {
    const sessionId = request.sessionId || uuidv4();
    this.activeSessions.set(sessionId, ws);

    try {
      // Send initial response
      ws.send(JSON.stringify({
        type: 'simulation_started',
        sessionId,
        trackId: request.trackId,
        message: 'AI agent simulation initiated...'
      }));

      // Simulate processing time
      await this.delay(1000);

      // Generate realistic metrics based on track
      const metrics = this.generateMetrics(request.trackId, request.inputData);

      // Send progress updates
      for (let i = 1; i <= 5; i++) {
        await this.delay(400);
        ws.send(JSON.stringify({
          type: 'simulation_progress',
          sessionId,
          progress: i * 20,
          stage: this.getProcessingStage(i)
        }));
      }

      // Send final results
      ws.send(JSON.stringify({
        type: 'simulation_complete',
        sessionId,
        trackId: request.trackId,
        results: {
          metrics,
          confidence: this.calculateConfidence(metrics),
          recommendations: this.generateRecommendations(request.trackId, metrics),
          processingTime: 2000 + Math.random() * 1000
        }
      }));

    } catch (error) {
      ws.send(JSON.stringify({
        type: 'simulation_error',
        sessionId,
        error: 'Simulation failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }

  private generateMetrics(trackId: number, inputData: any): AgentMetrics {
    // Base metrics with some randomization
    const base = {
      trustScore: 75 + Math.random() * 20,
      pitchStrength: 80 + Math.random() * 15,
      investorMatch: 70 + Math.random() * 25,
      momentum: 85 + Math.random() * 10,
      socialTrust: 78 + Math.random() * 18,
      fundraisePrediction: 72 + Math.random() * 23,
      partnerImpact: 82 + Math.random() * 13
    };

    // Adjust based on track focus
    switch (trackId) {
      case 1: // Identity Model
        base.trustScore += 10;
        break;
      case 2: // Pitch Strength
        base.pitchStrength += 8;
        break;
      case 3: // Fundraise Prediction
        base.fundraisePrediction += 12;
        break;
      case 4: // Investor Archetype
        base.investorMatch += 15;
        break;
      case 5: // Social Trust Graph
        base.socialTrust += 10;
        break;
      case 6: // Momentum Tracker
        base.momentum += 8;
        break;
      case 7: // Partner Impact
        base.partnerImpact += 12;
        break;
    }

    // Ensure values don't exceed 100
    Object.keys(base).forEach(key => {
      base[key as keyof AgentMetrics] = Math.min(100, base[key as keyof AgentMetrics]);
    });

    return base;
  }

  private calculateConfidence(metrics: AgentMetrics): number {
    const values = Object.values(metrics);
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - average, 2), 0) / values.length;
    
    // Higher confidence for more consistent scores
    return Math.max(60, 100 - variance);
  }

  private generateRecommendations(trackId: number, metrics: AgentMetrics): string[] {
    const recommendations: string[] = [];

    if (metrics.trustScore < 80) {
      recommendations.push("Consider strengthening onchain reputation through verified contributions");
    }

    if (metrics.pitchStrength < 75) {
      recommendations.push("Refine narrative clarity and value proposition articulation");
    }

    if (metrics.investorMatch < 70) {
      recommendations.push("Target investors with aligned portfolio focus and investment thesis");
    }

    if (metrics.momentum < 80) {
      recommendations.push("Increase community engagement and development activity");
    }

    if (recommendations.length === 0) {
      recommendations.push("Strong performance across all metrics - ready for fundraising");
    }

    return recommendations;
  }

  private getProcessingStage(stage: number): string {
    const stages = [
      "Initializing AI agents...",
      "Analyzing onchain data...",
      "Processing reputation signals...",
      "Computing trust metrics...",
      "Generating insights..."
    ];
    return stages[stage - 1] || "Processing...";
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private subscribeToUpdates(ws: WebSocket, sessionId: string) {
    if (sessionId) {
      this.activeSessions.set(sessionId, ws);
    }
  }

  broadcast(message: any) {
    this.activeSessions.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      }
    });
  }
}