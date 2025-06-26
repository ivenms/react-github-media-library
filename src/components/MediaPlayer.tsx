import React, { useRef, useEffect } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';
import { isDarkTheme } from '../utils';
import { MediaPlayerProps } from '../types';

export const MediaPlayer: React.FC<MediaPlayerProps> = ({ 
  media, 
  onClose, 
  autoPlay = true,
  theme = 'light'
}) => {
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(false);
  const isDark = isDarkTheme(theme);

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
    <div className="rgml-fixed rgml-inset-0 rgml-bg-black/80 rgml-backdrop-blur-sm rgml-z-50 rgml-flex rgml-items-end">
      <div className={`rgml-w-full ${isDark ? 'rgml-bg-gray-900 rgml-border-gray-700' : 'rgml-bg-white'} rgml-border-t rgml-shadow-2xl`}>
        <div className={`rgml-flex rgml-items-center rgml-justify-between rgml-p-4 rgml-border-b ${isDark ? 'rgml-bg-gray-800 rgml-border-gray-700' : 'rgml-bg-gray-50'}`}>
          <div className="rgml-flex-1 rgml-min-w-0">
            <h3 className={`rgml-text-lg rgml-font-semibold rgml-truncate ${isDark ? 'rgml-text-white' : 'rgml-text-gray-900'}`}>{media.title}</h3>
            <p className={`rgml-text-sm rgml-truncate ${isDark ? 'rgml-text-gray-300' : 'rgml-text-gray-600'}`}>by {media.author} • {media.category}</p>
          </div>
          <div className="rgml-flex rgml-items-center rgml-gap-2 rgml-ml-4">
            <button
              onClick={toggleMute}
              className={`rgml-p-2 rgml-rounded-full rgml-transition-colors ${isDark ? 'hover:rgml-bg-gray-700' : 'hover:rgml-bg-gray-200'}`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className={`rgml-w-5 rgml-h-5 ${isDark ? 'rgml-text-gray-300' : 'rgml-text-gray-600'}`} />
              ) : (
                <Volume2 className={`rgml-w-5 rgml-h-5 ${isDark ? 'rgml-text-gray-300' : 'rgml-text-gray-600'}`} />
              )}
            </button>
            <button
              onClick={onClose}
              className={`rgml-p-2 rgml-rounded-full rgml-transition-colors ${isDark ? 'hover:rgml-bg-gray-700' : 'hover:rgml-bg-gray-200'}`}
              title="Close player"
            >
              <X className={`rgml-w-5 rgml-h-5 ${isDark ? 'rgml-text-gray-300' : 'rgml-text-gray-600'}`} />
            </button>
          </div>
        </div>
        <div className="rgml-p-4">
          {media.mediaType === 'video' ? (
            <video
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              src={media.mediaUrl}
              controls
              autoPlay={autoPlay}
              className="rgml-w-full rgml-max-h-96 rgml-rounded-lg"
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
              className="rgml-w-full"
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
