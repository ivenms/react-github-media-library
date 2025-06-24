import React, { useRef, useEffect } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';
import { MediaPlayerProps } from '../types';

export const MediaPlayer: React.FC<MediaPlayerProps> = ({ 
  media, 
  onClose, 
  autoPlay = true,
  theme = 'light'
}) => {
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const toggleMute = () => {
    if (mediaRef.current) {
      mediaRef.current.muted = !mediaRef.current.muted;
      setIsMuted(mediaRef.current.muted);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end">
      <div className={`w-full ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white'} border-t shadow-2xl`}>
        <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50'}`}>
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{media.title}</h3>
            <p className={`text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>by {media.author} • {media.category}</p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={toggleMute}
              className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              ) : (
                <Volume2 className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              )}
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              title="Close player"
            >
              <X className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>
        <div className="p-4">
          {media.mediaType === 'video' ? (
            <video
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              src={media.mediaUrl}
              controls
              autoPlay={autoPlay}
              className="w-full max-h-96 rounded-lg"
              onLoadedMetadata={() => {
                if (mediaRef.current) {
                  setIsMuted(mediaRef.current.muted);
                }
              }}
            />
          ) : (
            <audio
              ref={mediaRef as React.RefObject<HTMLAudioElement>}
              src={media.mediaUrl}
              controls
              autoPlay={autoPlay}
              className="w-full"
              onLoadedMetadata={() => {
                if (mediaRef.current) {
                  setIsMuted(mediaRef.current.muted);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
