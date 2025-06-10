import React, { useState } from 'react';
import { tracks } from '../data/tracks';
import TrackCard from './TrackCard';

const TracksShowcase: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);

  return (
    <section id="tracks" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI Agent Tracks
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose your track and build AI agents that will revolutionize decentralized fundraising. 
            Each agent serves as a critical component in the OnlyFounders protocol ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              isSelected={selectedTrack === track.id}
              onSelect={() => setSelectedTrack(selectedTrack === track.id ? null : track.id)}
            />
          ))}
        </div>

        {selectedTrack && (
          <div className="mt-12 p-8 bg-gray-900 rounded-2xl border border-gray-700">
            {(() => {
              const track = tracks.find(t => t.id === selectedTrack);
              if (!track) return null;
              
              return (
                <div>
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${track.color} flex items-center justify-center mr-4`}>
                      {track.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{track.title}</h3>
                      <p className="text-gray-400">{track.subtitle}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
                      <p className="text-gray-300 mb-6">{track.description}</p>
                      <h4 className="text-lg font-semibold text-white mb-3">Why It Matters</h4>
                      <p className="text-gray-300">{track.importance}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                      <ul className="space-y-3">
                        {track.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
};

export default TracksShowcase;