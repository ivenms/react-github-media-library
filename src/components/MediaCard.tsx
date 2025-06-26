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
      isDark ? 'rgml-bg-gray-800 rgml-border rgml-border-gray-700' : 'rgml-bg-white'
    }`}>
      <div className="rgml-relative rgml-overflow-hidden">
        <img 
          src={item.thumbnailUrl} 
          alt={item.title}
          className="rgml-w-full rgml-h-48 rgml-object-cover rgml-transition-transform rgml-duration-300 group-hover:rgml-scale-105"
          onError={handleImageError}
        />
        <div className="rgml-absolute rgml-inset-0 rgml-bg-gradient-to-t rgml-from-black/60 rgml-via-transparent rgml-to-transparent rgml-opacity-0 group-hover:rgml-opacity-100 rgml-transition-opacity rgml-duration-300" />
        <button
          onClick={() => onSelect(item)}
          className="rgml-absolute rgml-inset-0 rgml-flex rgml-items-center rgml-justify-center rgml-bg-black/20 hover:rgml-bg-black/40 rgml-transition-all rgml-duration-300"
        >
          <div className="rgml-bg-white/90 rgml-backdrop-blur-sm rgml-rounded-full rgml-p-4 rgml-transform rgml-scale-90 group-hover:rgml-scale-100 rgml-transition-transform rgml-duration-300">
            <Play className="rgml-w-6 rgml-h-6 rgml-text-gray-800 rgml-ml-1" fill="currentColor" />
          </div>
        </button>
        <div className="rgml-absolute rgml-top-3 rgml-right-3">
          <div className={`rgml-p-2 rgml-rounded-full ${isDark ? 'rgml-bg-gray-900/80' : 'rgml-bg-white/80'} rgml-backdrop-blur-sm`}>
            {item.mediaType === 'video' ? (
              <Video className={`rgml-w-4 rgml-h-4 ${isDark ? 'rgml-text-white' : 'rgml-text-gray-700'}`} />
            ) : (
              <Music className={`rgml-w-4 rgml-h-4 ${isDark ? 'rgml-text-white' : 'rgml-text-gray-700'}`} />
            )}
          </div>
        </div>
      </div>
      
      <div className="rgml-p-5">
        <div className="rgml-flex rgml-items-center rgml-justify-between rgml-mb-3">
          <span className={`rgml-inline-block rgml-px-3 rgml-py-1 rgml-text-xs rgml-font-medium rgml-text-white rgml-rounded-full ${getCategoryColor(item.category).replace('bg-', 'rgml-bg-')}`}>
            {item.category}
          </span>
          <span className={`rgml-text-xs ${isDark ? 'rgml-text-gray-400' : 'rgml-text-gray-500'}`}>
            {new Date().toLocaleDateString()}
          </span>
        </div>
        
        <h3 className={`rgml-text-lg rgml-font-semibold rgml-mb-2 rgml-line-clamp-2 ${
          isDark ? 'rgml-text-white' : 'rgml-text-gray-900'
        }`}>
          {item.title}
        </h3>
        
        <p className={`rgml-text-sm rgml-mb-3 ${isDark ? 'rgml-text-gray-300' : 'rgml-text-gray-600'}`}>
          by {item.author}
        </p>
        
        {item.size && (
          <div className={`rgml-text-xs ${isDark ? 'rgml-text-gray-400' : 'rgml-text-gray-500'}`}>
            {(item.size / (1024 * 1024)).toFixed(1)} MB
          </div>
        )}
      </div>
    </div>
  );
};
