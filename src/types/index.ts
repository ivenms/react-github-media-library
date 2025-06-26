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
  date?: string;
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
    date?: string;
  };
  defaultThumbnailUrl?: string;
  cacheTtl?: number; // Cache TTL in milliseconds (default: 1 hour)
}

export interface MediaPlayerProps {
  media: MediaItem;
  onClose: () => void;
  autoPlay?: boolean;
  theme?: 'light' | 'dark';
}

// Cache-related types
export interface CacheOptions {
  ttl: number; // Time to live in milliseconds
  key?: string; // Optional custom cache key
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Theme type
export type Theme = 'light' | 'dark';

// Component prop interfaces
export interface LoadingSpinnerProps {
  theme?: Theme;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  theme?: Theme;
}

export interface MediaCardProps {
  item: MediaItem;
  onSelect: (item: MediaItem) => void;
  theme?: Theme;
  defaultThumbnailUrl?: string;
  allCategories?: string[];
}

export interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  theme?: Theme;
}
