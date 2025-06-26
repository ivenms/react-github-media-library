import React, { useState, useMemo } from 'react';
import { GitHubMediaLibraryProps } from '../types';
import { useGitHubMedia } from '../hooks/useGitHubMedia';
import { MediaCard } from './MediaCard';
import { MediaPlayer } from './MediaPlayer';
import { SearchAndFilter } from './SearchAndFilter';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { getFriendlyErrorMessage, extractUniqueCategories, isDarkTheme } from '../utils';

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
  defaultThumbnailUrl,
  cacheTtl
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
    defaultThumbnailUrl,
    cacheTtl
  });

  const availableCategories = useMemo(() => {
    if (categories) return categories;
    return extractUniqueCategories(mediaItems);
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

  const isDark = isDarkTheme(theme);

  return (
    <div className={`${className} ${isDark ? 'rgml-text-white' : 'rgml-text-gray-900'} rgml-min-h-screen rgml-pb-24`}>
      <main className="rgml-px-4 rgml-py-8">
        {(showSearch || showFilter) && !loading && !error && (
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={filter}
            onCategoryChange={setFilter}
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
          <div className={`rgml-text-center rgml-py-12 ${isDark ? 'rgml-text-gray-300' : 'rgml-text-gray-600'}`}>
            <p className="rgml-text-lg">No media files found.</p>
            {searchTerm && (
              <p className="rgml-mt-2">Try adjusting your search terms.</p>
            )}
            {!searchTerm && (
              <p className="rgml-mt-2">This repository or folder does not contain any supported media files.</p>
            )}
          </div>
        )}

        {!loading && !error && filteredItems.length > 0 && (
          <div className="rgml-grid rgml-grid-cols-1 sm:rgml-grid-cols-2 lg:rgml-grid-cols-3 xl:rgml-grid-cols-4 rgml-gap-6">
            {filteredItems.map(item => (
              <MediaCard
                key={item.id}
                item={item}
                onSelect={handleMediaSelect}
                theme={theme}
                defaultThumbnailUrl={defaultThumbnailUrl}
                allCategories={availableCategories}
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
