import React from 'react';
import { Play, Music, Video } from 'lucide-react';
import { MediaItem } from '../types';
import defaultThumbnail from '../assets/default-thumbnail.svg';

interface MediaCardProps {
  item: MediaItem;
  onSelect: (item: MediaItem) => void;
  theme?: 'light' | 'dark';
  defaultThumbnailUrl?: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, onSelect, theme = 'light', defaultThumbnailUrl }) => {
  const isDark = theme === 'dark';
  
  const getCategoryColor = (category: string) => {
    const colors = {
      'Tutorial': 'bg-blue-500',
      'Presentation': 'bg-purple-500',
      'Documentary': 'bg-orange-500',
      'Music': 'bg-indigo-500',
      'Podcast': 'bg-green-500',
      'Interview': 'bg-red-500',
      'Entertainment': 'bg-pink-500',
      'Educational': 'bg-teal-500',
      'default': 'bg-gray-500'
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    if (defaultThumbnailUrl) {
      target.src = defaultThumbnailUrl;
    } else {
      target.src = defaultThumbnail;
    }
  };

  return (
    <div className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${
      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
    }`}>
      <div className="relative overflow-hidden">
        <img 
          src={item.thumbnailUrl} 
          alt={item.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={() => onSelect(item)}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all duration-300"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" />
          </div>
        </button>
        <div className="absolute top-3 right-3">
          <div className={`p-2 rounded-full ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-sm`}>
            {item.mediaType === 'video' ? (
              <Video className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-700'}`} />
            ) : (
              <Music className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-700'}`} />
            )}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-block px-3 py-1 text-xs font-medium text-white rounded-full ${getCategoryColor(item.category)}`}>
            {item.category}
          </span>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {new Date().toLocaleDateString()}
          </span>
        </div>
        
        <h3 className={`text-lg font-semibold mb-2 line-clamp-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {item.title}
        </h3>
        
        <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          by {item.author}
        </p>
        
        {item.size && (
          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {(item.size / (1024 * 1024)).toFixed(1)} MB
          </div>
        )}
      </div>
    </div>
  );
};
