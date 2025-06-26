import React from 'react';
import { Play, Music, Video } from 'lucide-react';
import { MediaItem } from '../types';
import defaultThumbnail from '../assets/default-thumbnail.svg';
import { formatMediaDate } from '../utils/date';
import { getCategoryColor, isDarkTheme } from '../utils';
import { formatFileSizeInMB } from '../utils/file';

interface MediaCardProps {
  item: MediaItem;
  onSelect: (item: MediaItem) => void;
  theme?: 'light' | 'dark';
  defaultThumbnailUrl?: string;
  allCategories?: string[];
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, onSelect, theme = 'light', defaultThumbnailUrl, allCategories = [] }) => {
  const isDark = isDarkTheme(theme);
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    if (defaultThumbnailUrl) {
      target.src = defaultThumbnailUrl;
    } else {
      target.src = defaultThumbnail;
    }
  };

  return (
    <div className={`rgml-rounded-xl rgml-shadow-lg hover:rgml-shadow-xl rgml-transition-all rgml-duration-300 rgml-overflow-hidden group ${
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
          <span className={`rgml-inline-block rgml-px-3 rgml-py-1 rgml-text-xs rgml-font-medium rgml-text-white rgml-rounded-full ${getCategoryColor(item.category, allCategories)}`}>
            {item.category}
          </span>
          <span className={`rgml-text-xs ${isDark ? 'rgml-text-gray-400' : 'rgml-text-gray-500'}`}>
            {formatMediaDate(item.date)}
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
            {formatFileSizeInMB(item.size)}
          </div>
        )}
      </div>
    </div>
  );
};
