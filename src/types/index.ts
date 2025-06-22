export interface MediaItem {
  id: string;
  title: string;
  author: string;
  category: string;
  mediaUrl: string;
  mediaType: 'audio' | 'video';
  thumbnailUrl: string;
  fileName: string;
  size?: number;
  createdAt?: string;
}

export interface GitHubMediaLibraryProps {
  owner: string;
  repo: string;
  mediaFolderPath?: string;
  thumbnailFolderPath?: string;
  githubToken?: string;
  className?: string;
  theme?: 'light' | 'dark';
  showSearch?: boolean;
  showFilter?: boolean;
  showHeader?: boolean;
  headerTitle?: string;
  headerSubtitle?: string;
  categories?: string[];
  onMediaSelect?: (media: MediaItem) => void;
  customThumbnailUrl?: (fileName: string) => string;
  fileNameParser?: (fileName: string) => {
    category: string;
    title: string;
    author: string;
  };
  defaultThumbnailUrl?: string;
}

export interface MediaPlayerProps {
  media: MediaItem;
  onClose: () => void;
  autoPlay?: boolean;
}
