import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, Users, Zap, Play, Pause } from 'lucide-react';
import { useWebSocket } from '../hooks/useWebSocket';

const AgentDemo: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [simulationStage, setSimulationStage] = useState('');
  
  const { isConnected, lastMessage, sendMessage } = useWebSocket('ws://localhost:3001');

  const metrics = [
    { label: 'Trust Score', value: 87, color: 'text-green-400', icon: <Activity className="w-5 h-5" /> },
    { label: 'Pitch Strength', value: 92, color: 'text-blue-400', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Investor Match', value: 78, color: 'text-purple-400', icon: <Users className="w-5 h-5" /> },
    { label: 'Momentum', value: 94, color: 'text-cyan-400', icon: <Zap className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSimulating) {
        setActiveMetric((prev) => (prev + 1) % metrics.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  useEffect(() => {
    if (lastMessage) {
      switch (lastMessage.type) {
        case 'simulation_started':
          setIsSimulating(true);
          setSimulationProgress(0);
          setSimulationStage('Initializing...');
          break;
        case 'simulation_progress':
          setSimulationProgress(lastMessage.progress);
          setSimulationStage(lastMessage.stage);
          break;
        case 'simulation_complete':
          setIsSimulating(false);
          setSimulationProgress(100);
          setSimulationStage('Complete');
          // Update metrics with real results
          setTimeout(() => {
            setSimulationProgress(0);
            setSimulationStage('');
          }, 2000);
          break;
        case 'simulation_error':
          setIsSimulating(false);
          setSimulationProgress(0);
          setSimulationStage('Error occurred');
          break;
      }
    }
  }, [lastMessage]);

  const simulateAgent = () => {
    if (isConnected) {
      sendMessage({
        type: 'simulate',
        trackId: Math.floor(Math.random() * 7) + 1,
        inputData: {
          walletAddress: '0x' + Math.random().toString(16).substr(2, 40),
          timestamp: Date.now()
        }
      });
    } else {
      // Fallback simulation without WebSocket
      setIsSimulating(true);
      setSimulationProgress(0);
      
      const stages = [
        'Initializing AI agents...',
        'Analyzing onchain data...',
        'Processing reputation signals...',
        'Computing trust metrics...',
        'Generating insights...'
      ];

      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setSimulationProgress(progress);
        setSimulationStage(stages[Math.floor(progress / 20) - 1] || 'Processing...');
        
        if (progress >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          setTimeout(() => {
            setSimulationProgress(0);
            setSimulationStage('');
          }, 2000);
        }
      }, 500);
    }
  };

  return (
    <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              See AI Agents in Action
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience how our AI agents work together to evaluate projects, founders, and opportunities in real-time.
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <span className="text-sm text-gray-400">
              {isConnected ? 'Connected to AI Network' : 'Offline Mode'}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="p-8 bg-gray-800 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Live Agent Analysis</h3>
              <div className="space-y-6">
                {metrics.map((metric, index) => (
                  <div key={index} className={`transition-all duration-500 ${activeMetric === index ? 'opacity-100 scale-105' : 'opacity-70'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`${metric.color} mr-3`}>
                          {metric.icon}
                        </div>
                        <span className="text-white font-semibold">{metric.label}</span>
                      </div>
                      <span className={`${metric.color} font-bold text-lg`}>{metric.value}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          metric.color === 'text-green-400' ? 'from-green-400 to-green-500' :
                          metric.color === 'text-blue-400' ? 'from-blue-400 to-blue-500' :
                          metric.color === 'text-purple-400' ? 'from-purple-400 to-purple-500' :
                          'from-cyan-400 to-cyan-500'
                        } transition-all duration-1000`}
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={simulateAgent}
                disabled={isSimulating}
                className={`w-full py-4 px-8 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                  isSimulating 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transform hover:scale-105'
                }`}
              >
                {isSimulating ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Run Agent Simulation
                  </>
                )}
              </button>

              {isSimulating && (
                <div className="p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Processing</span>
                    <span className="text-purple-400 font-bold">{simulationProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300"
                      style={{ width: `${simulationProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400">{simulationStage}</p>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
            <div className="relative p-8 bg-gray-900 rounded-3xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Agent Network Visualization</h3>
              <div className="relative h-80 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Central node */}
                  <div className={`w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center ${isSimulating ? 'animate-pulse' : ''}`}>
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Surrounding nodes */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`absolute w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full ${isSimulating ? 'animate-bounce' : ''}`}
                      style={{
                        transform: `rotate(${i * 60}deg) translateX(120px) rotate(-${i * 60}deg)`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                  
                  {/* Connection lines */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={`line-${i}`}
                      className={`absolute w-px h-24 bg-gradient-to-t from-transparent via-purple-400 to-transparent ${isSimulating ? 'opacity-60' : 'opacity-30'}`}
                      style={{
                        transform: `rotate(${i * 60}deg)`,
                        transformOrigin: 'bottom center'
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-400 text-center mt-4">
                {isSimulating 
                  ? 'AI agents processing data in real-time...' 
                  : 'Decentralized AI agents working in harmony to evaluate Web3 projects'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentDemo;