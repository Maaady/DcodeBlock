import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TracksShowcase from './components/TracksShowcase';
import AgentDemo from './components/AgentDemo';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Hero />
      <TracksShowcase />
      <AgentDemo />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;