import React from 'react';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30 mb-8">
            <Zap className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-sm text-purple-300">OnlyFounders AI Hackathon</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Decentralized AI Swarms
            </span>
            <br />
            <span className="text-white">for Onchain Fundraising</span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Shape the future of Web3 fundraising where funding is guided not by pitch decks alone, 
            but by trust graphs, AI evaluators, and onchain identity. Build modular AI agents that 
            preserve privacy and analyze blockchain activity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105">
              Start Building
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="inline-flex items-center px-8 py-4 border border-gray-600 rounded-lg font-semibold hover:bg-gray-800 transition-all">
              Explore Tracks
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Privacy-Preserving</h3>
              <p className="text-gray-400">TEE-secured processing with zero-knowledge proofs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Decentralized</h3>
              <p className="text-gray-400">Compatible with DID and decentralized storage</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Modular</h3>
              <p className="text-gray-400">Multi-agent environment with federated learning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;