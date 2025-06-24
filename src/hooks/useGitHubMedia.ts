import { useState, useEffect, useCallback } from 'react';
import { Octokit } from '@octokit/rest';
import { MediaItem, GitHubMediaLibraryProps } from '../types';

export const useGitHubMedia = ({
  owner,
  repo,
  mediaFolderPath = 'media',
  thumbnailFolderPath = 'thumbnails',
  githubToken,
  fileNameParser,
  customThumbnailUrl,
  defaultThumbnailUrl
}: Pick<GitHubMediaLibraryProps, 'owner' | 'repo' | 'mediaFolderPath' | 'thumbnailFolderPath' | 'githubToken' | 'fileNameParser' | 'customThumbnailUrl' | 'defaultThumbnailUrl'>) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const defaultFileNameParser = (fileName: string) => {
    const nameWithoutExt = fileName.replace(/\.(mp4|wav|mp3|m4a|webm|ogg)$/i, '');
    const parts = nameWithoutExt.split('_');
    
    if (parts.length >= 3) {
      return {
        category: parts[0].replace(/-/g, ' '),
        title: parts[1].replace(/-/g, ' '),
        author: parts.slice(2).join(' ').replace(/-/g, ' ')
      };
    }
    
    return {
      category: 'General',
      title: nameWithoutExt.replace(/-/g, ' '),
      author: 'Unknown'
    };
  };

  const fetchGitHubMedia = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const octokit = new Octokit({
        auth: githubToken
      });

      const mediaRes = await octokit.repos.getContent({
        owner,
        repo,
        path: mediaFolderPath
      });

      if (Array.isArray(mediaRes.data)) {
        const supportedFormats = /\.(mp4|wav|mp3|m4a|webm|ogg)$/i;
        
        const media: MediaItem[] = mediaRes.data
          .filter((item) => item.type === 'file' && supportedFormats.test(item.name))
          .map((item, index) => {
            const parser = fileNameParser || defaultFileNameParser;
            const { category, title, author } = parser(item.name);
            
            const thumbnailFilename = item.name.replace(supportedFormats, '.jpg');
            let thumbnailUrl = customThumbnailUrl 
              ? customThumbnailUrl(thumbnailFilename)
              : `https://raw.githubusercontent.com/${owner}/${repo}/main/${thumbnailFolderPath}/${thumbnailFilename}`;
            // Fallback to defaultThumbnailUrl if provided, else built-in image
            // We'll handle the actual fallback in the MediaCard's onError handler for robustness

            const isVideo = /\.(mp4|webm)$/i.test(item.name);

            return {
              id: `${index}-${item.sha}`,
              title,
              author,
              category,
              mediaUrl: item.download_url || '',
              mediaType: isVideo ? 'video' : 'audio',
              thumbnailUrl,
              fileName: item.name,
              size: item.size,
              createdAt: new Date().toISOString() // GitHub API doesn't provide creation date for content
            };
          });

        setMediaItems(media);
      }
    } catch (err: any) {
      console.error('Error fetching GitHub media:', err);
      // Custom error handling
      if (err && typeof err === 'object') {
        if (err.status === 403 && err.message && err.message.toLowerCase().includes('api rate limit')) {
          setError('API rate limit exceeded. Please try again later or use a GitHub token.');
        } else if (err.status === 404) {
          setError('Repository or folder not found. Please check the repository name and media folder path.');
        } else if (err.status === 401) {
          setError('Unauthorized access. Please check your GitHub token permissions.');
        } else if (err.message) {
          setError(err.message);
        } else {
          setError('Failed to fetch media files.');
        }
      } else {
        setError('Failed to fetch media files.');
      }
    } finally {
      setLoading(false);
    }
  }, [owner, repo, mediaFolderPath, thumbnailFolderPath, githubToken, fileNameParser, customThumbnailUrl, defaultThumbnailUrl]);

  useEffect(() => {
    fetchGitHubMedia();
  }, [fetchGitHubMedia]);

  return {
    mediaItems,
    loading,
    error,
    refetch: fetchGitHubMedia
  };
};
