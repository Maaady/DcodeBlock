import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Track } from '../types/Track';

interface TrackCardProps {
  track: Track;
  isSelected: boolean;
  onSelect: () => void;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, isSelected, onSelect }) => {
  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-300 ${
        isSelected ? 'transform scale-105' : ''
      }`}
      onClick={onSelect}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
      <div className="relative p-8 bg-gray-900 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${track.color} flex items-center justify-center`}>
            {track.icon}
          </div>
          <div className={`transition-transform duration-300 ${isSelected ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{track.title}</h3>
        <p className="text-gray-400 mb-4">{track.subtitle}</p>
        
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2">Track {track.id}</span>
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
      </div>
    </div>
  );
};

export default TrackCard;