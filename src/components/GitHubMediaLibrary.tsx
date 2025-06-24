import React, { useState, useMemo } from 'react';
import { GitHubMediaLibraryProps } from '../types';
import { useGitHubMedia } from '../hooks/useGitHubMedia';
import { MediaCard } from './MediaCard';
import { MediaPlayer } from './MediaPlayer';
import { SearchAndFilter } from './SearchAndFilter';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

export const GitHubMediaLibrary: React.FC<GitHubMediaLibraryProps> = ({
  owner,
  repo,
  mediaFolderPath = 'media',
  thumbnailFolderPath = 'thumbnails',
  githubToken,
  className = '',
  theme = 'light',
  showSearch = true,
  showFilter = true,
  categories,
  onMediaSelect,
  customThumbnailUrl,
  fileNameParser,
  defaultThumbnailUrl
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [currentMedia, setCurrentMedia] = useState(null);

  const { mediaItems, loading, error, refetch } = useGitHubMedia({
    owner,
    repo,
    mediaFolderPath,
    thumbnailFolderPath,
    githubToken,
    fileNameParser,
    customThumbnailUrl,
    defaultThumbnailUrl
  });

  const availableCategories = useMemo(() => {
    if (categories) return categories;
    const uniqueCategories = [...new Set(mediaItems.map(item => item.category))];
    return uniqueCategories.sort();
  }, [mediaItems, categories]);

  const filteredItems = useMemo(() => {
    return mediaItems.filter(item => {
      const matchSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchFilter = filter === 'All' || item.category === filter;
      return matchSearch && matchFilter;
    });
  }, [mediaItems, searchTerm, filter]);

  const handleMediaSelect = (media: any) => {
    setCurrentMedia(media);
    onMediaSelect?.(media);
  };

  const isDark = theme === 'dark';

  // Helper to map error to user-friendly message
  const getFriendlyErrorMessage = (error: string | null) => {
    if (!error) return '';
    if (error.toLowerCase().includes('rate limit')) {
      return 'The limit to watch the media library with in last hour has been reached. Please try again later.';
    }
    if (error.toLowerCase().includes('not found')) {
      return 'The specified repository or folder could not be found. Please contact with the administrator.';
    }
    if (error.toLowerCase().includes('unauthorized')) {
      return 'Unauthorized access. Please check your GitHub token permissions.';
    }
    return error;
  };

  return (
    <div className={`${className} ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'} min-h-screen pb-24`}>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {(showSearch || showFilter) && !loading && !error && (
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filter={filter}
            onFilterChange={setFilter}
            categories={availableCategories}
            theme={theme}
          />
        )}

        {loading && <LoadingSpinner theme={theme} />}
        
        {error && (
          <ErrorMessage 
            message={getFriendlyErrorMessage(error)} 
            onRetry={refetch}
            theme={theme}
          />
        )}

        {!loading && !error && filteredItems.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <p className="text-lg">No media files found.</p>
            {searchTerm && (
              <p className="mt-2">Try adjusting your search terms.</p>
            )}
            {!searchTerm && (
              <p className="mt-2">This repository or folder does not contain any supported media files.</p>
            )}
          </div>
        )}

        {!loading && !error && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <MediaCard
                key={item.id}
                item={item}
                onSelect={handleMediaSelect}
                theme={theme}
                defaultThumbnailUrl={defaultThumbnailUrl}
              />
            ))}
          </div>
        )}
      </main>

      {currentMedia && (
        <MediaPlayer
          media={currentMedia}
          onClose={() => setCurrentMedia(null)}
          autoPlay={true}
          theme={theme}
        />
      )}
    </div>
  );
};
