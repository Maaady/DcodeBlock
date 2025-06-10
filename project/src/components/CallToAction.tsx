import React from 'react';
import { ArrowRight, Calendar, Trophy, Code } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section id="participate" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Build the Future?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join the hackathon and create AI agents that will reshape how Web3 projects get funded. 
            Build modular, privacy-preserving intelligence for decentralized fundraising.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-8 bg-gray-800 rounded-2xl border border-gray-700">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Hackathon Timeline</h3>
            <p className="text-gray-300 mb-4">4 weeks to build and submit your AI agent</p>
            <div className="text-sm text-gray-400">
              <div>Registration: Open Now</div>
              <div>Submission: March 30, 2024</div>
              <div>Judging: April 1-7, 2024</div>
            </div>
          </div>

          <div className="text-center p-8 bg-gray-800 rounded-2xl border border-gray-700">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Prize Pool</h3>
            <p className="text-gray-300 mb-4">$100,000 in prizes and grants</p>
            <div className="text-sm text-gray-400">
              <div>1st Place: $30,000</div>
              <div>2nd Place: $20,000</div>
              <div>3rd Place: $15,000</div>
              <div>+ Track-specific prizes</div>
            </div>
          </div>

          <div className="text-center p-8 bg-gray-800 rounded-2xl border border-gray-700">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Resources</h3>
            <p className="text-gray-300 mb-4">Everything you need to get started</p>
            <div className="text-sm text-gray-400">
              <div>Technical Documentation</div>
              <div>API Access & SDKs</div>
              <div>Mentor Support</div>
              <div>Community Discord</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105">
              Register Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="inline-flex items-center px-8 py-4 border border-gray-600 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all">
              View Documentation
            </button>
          </div>
          <p className="text-gray-400 mt-4">
            Questions? Join our Discord community for support and updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;