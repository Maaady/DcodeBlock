import React from 'react';
import { 
  Shield, 
  Target, 
  TrendingUp, 
  Users, 
  Network, 
  Activity, 
  Handshake 
} from 'lucide-react';
import { Track } from '../types/Track';

export const tracks: Track[] = [
  {
    id: 1,
    title: "Identity Model Agent",
    subtitle: "Credibility & Trustworthiness Evaluator",
    description: "Evaluates the credibility, authenticity, and historical trustworthiness of a founder, investor, or contributor using onchain data and offchain references.",
    importance: "Web3 lacks formalized reputation. This agent acts as a decentralized verifier that flags sybil risk, surfaces real contributors, and helps capital route to the right builders.",
    features: [
      "DID resolution",
      "zk-KYC scores", 
      "Reputation anchoring from verifiable credentials",
      "TEE-secured scoring logic"
    ],
    icon: React.createElement(Shield, { className: "w-8 h-8" }),
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Pitch Strength Agent",
    subtitle: "Narrative & Quality Analyzer",
    description: "Scores a founder's pitch based on narrative clarity, originality, team strength, and market fit — using encrypted NLP pipelines.",
    importance: "A strong pitch isn't just about writing — it reflects clarity of thought. This agent enables fundraising platforms to assess pitch quality without exposing the content.",
    features: [
      "Local BERT/RoBERTa fine-tuning",
      "TEE-enforced text processing",
      "Multi-criteria rating (structure, value prop, team, timing)",
      "Optional zero-knowledge score proofs"
    ],
    icon: React.createElement(Target, { className: "w-8 h-8" }),
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "Fundraise Prediction Agent",
    subtitle: "Success Likelihood Forecaster",
    description: "Forecasts the likelihood of a project successfully closing a raise based on real-time and historical factors — narrative strength, founder trust, early traction, and more.",
    importance: "VCs use intuition and spreadsheets. This agent models onchain predictive intelligence, giving communities a data-driven signal before deployment of capital.",
    features: [
      "Ensemble models (NLP + tabular + behavioral)",
      "Federated time-series analysis",
      "Weighted heuristics: pitch, founder, network, timing",
      "Transparent, explainable scoring logic"
    ],
    icon: React.createElement(TrendingUp, { className: "w-8 h-8" }),
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    title: "Investor Archetype Agent",
    subtitle: "Behavioral Classification System",
    description: "Clusters investor wallets into behavior-based categories — such as early-stage backers, ecosystem-specific participants, or mercenary whales.",
    importance: "Founders don't just want capital — they want aligned backers. This agent helps projects find mission-aligned capital based on real past behavior.",
    features: [
      "Onchain clustering",
      "Wallet history feature extraction",
      "Behavioral tagging via ZK",
      "Archetype classification models"
    ],
    icon: React.createElement(Users, { className: "w-8 h-8" }),
    color: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    title: "Social Trust Graph Agent",
    subtitle: "Collaboration & Endorsement Network",
    description: "Analyzes collaboration history, peer endorsements, past team formations, and mutual contributor networks to build a trust graph.",
    importance: "In Web3, who vouches for whom matters more than resumes. This agent becomes the social proof layer for decentralized capital formation.",
    features: [
      "Graph construction (IPFS, Ceramic, or Lens data)",
      "Reputation propagation",
      "ZK-verified endorsements",
      "Dynamic trust scoring"
    ],
    icon: React.createElement(Network, { className: "w-8 h-8" }),
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: 6,
    title: "Momentum Tracker Agent",
    subtitle: "Traction & Velocity Monitor",
    description: "Detects traction across GitHub, Twitter, onchain activity, community mentions, and interaction patterns to assess early project velocity.",
    importance: "Momentum is a leading indicator of success. This agent acts as a signal radar for emerging projects before traction becomes obvious.",
    features: [
      "Federated time-series modeling",
      "Web3-native signal ingestion (tweets, commits, txns)",
      "Weighted scoring across data streams",
      "Optional anomaly detection layer"
    ],
    icon: React.createElement(Activity, { className: "w-8 h-8" }),
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 7,
    title: "Partner Impact Agent",
    subtitle: "Contribution Attribution System",
    description: "Attributes actual contribution impact from advisors, partner orgs, or collaborators using a hybrid of messaging patterns, commits, token flow, and governance activity.",
    importance: "Advisors often get equity without tracking value. This agent brings transparency and fairness to contribution attribution.",
    features: [
      "Contribution graph building",
      "Action-weighted scoring (commits, proposals, mentions)",
      "Confidential computing for attribution",
      "Shared scoring among multi-agent teams"
    ],
    icon: React.createElement(Handshake, { className: "w-8 h-8" }),
    color: "from-pink-500 to-rose-500"
  }
];