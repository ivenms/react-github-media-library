// src/App.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Octokit } from '@octokit/rest';

interface MediaItem {
  id: string;
  title: string;
  author: string;
  category: string;
  mediaUrl: string;
  mediaType: 'audio' | 'video';
  thumbnailUrl: string;
}

const GITHUB_OWNER = 'thebrethrenassemblydubai';
const GITHUB_REPO = 'media-files';
const MEDIA_FOLDER_PATH = 'media';
const THUMBNAIL_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/thumbnails`;
const DEFAULT_THUMBNAIL = `${THUMBNAIL_BASE_URL}/default.jpg`;

const App: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [currentMedia, setCurrentMedia] = useState<MediaItem | null>(null);
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);

  const fetchGitHubMedia = async () => {
    const octokit = new Octokit();
    const mediaRes = await octokit.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: MEDIA_FOLDER_PATH
    });

    if (Array.isArray(mediaRes.data)) {
      const media: MediaItem[] = mediaRes.data
        .filter((item) => item.name.endsWith('.mp4') || item.name.endsWith('.wav'))
        .map((item, index) => {
          const [category, title, authorWithExt] = item.name.split('_');
          const author = authorWithExt.replace(/\.(mp4|wav)/, '');
          const thumbnailFilename = item.name.replace(/\.(mp4|wav)/, '.jpg');
          const thumbnailUrl = `${THUMBNAIL_BASE_URL}/${thumbnailFilename}`;

          return {
            id: `${index}`,
            title: title.replace(/-/g, ' '),
            author: author.replace(/-/g, ' '),
            category: category.replace(/-/g, ' '),
            mediaUrl: item.download_url || '',
            mediaType: item.name.endsWith('.mp4') ? 'video' : 'audio',
            thumbnailUrl: thumbnailUrl
          };
        });
      setMediaItems(media);
    }
  };

  useEffect(() => {
    fetchGitHubMedia();
  }, []);

  const filteredItems = mediaItems.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filter === 'All' || item.category === filter;
    return matchSearch && matchFilter;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Sermon': return 'bg-blue-500';
      case 'Bible Study': return 'bg-purple-500';
      case 'Video': return 'bg-orange-500';
      case 'Music': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-gray-800">Explore & Learn</h1>
        <p className="text-sm text-gray-600 mt-1">Browse sermons, music, and teachings</p>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by title or author"
            className="border px-3 py-2 rounded w-full sm:w-1/2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded w-full sm:w-1/4"
          >
            <option>All</option>
            <option>Sermon</option>
            <option>Music</option>
            <option>Bible Study</option>
            <option>Video</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded shadow hover:shadow-lg overflow-hidden">
              <div className="relative">
                <img src={item.thumbnailUrl} alt={item.title} className="w-full h-48 object-cover" onError={(e) => {
                  (e.target as HTMLImageElement).src = DEFAULT_THUMBNAIL;
                }} />
                <button
                  onClick={() => setCurrentMedia(item)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60"
                >
                  <span className="text-white text-xl font-semibold">▶</span>
                </button>
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 mb-1">OCT 15, 2024</div>
                <h3 className="text-base font-semibold text-gray-800 mb-1 truncate">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2 truncate">{item.author}</p>
                <span className={`inline-block px-2 py-1 text-xs text-white rounded ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {currentMedia && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-xl z-50">
          <div className="mb-2 font-medium text-gray-800">
            {currentMedia.title} <span className="text-gray-500 text-sm">by {currentMedia.author}</span>
          </div>
          {currentMedia.mediaType === 'video' ? (
            <video
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              src={currentMedia.mediaUrl}
              controls
              autoPlay
              className="w-full"
            />
          ) : (
            <audio
              ref={mediaRef as React.RefObject<HTMLAudioElement>}
              src={currentMedia.mediaUrl}
              controls
              autoPlay
              className="w-full"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
