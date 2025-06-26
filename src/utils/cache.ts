import { CacheOptions, CacheEntry } from '../types';

export class BrowserCache {
  private static instance: BrowserCache;
  private cache: Map<string, CacheEntry<any>> = new Map();

  static getInstance(): BrowserCache {
    if (!BrowserCache.instance) {
      BrowserCache.instance = new BrowserCache();
    }
    return BrowserCache.instance;
  }

  set<T>(key: string, data: T, options: CacheOptions): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: options.ttl
    };
    this.cache.set(key, entry);
    
    // Also store in localStorage for persistence across page reloads
    try {
      localStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.warn('Failed to store cache in localStorage:', error);
    }
  }

  get<T>(key: string): T | null {
    // First try memory cache
    const memoryEntry = this.cache.get(key);
    if (memoryEntry && this.isValid(memoryEntry)) {
      return memoryEntry.data;
    }

    // Then try localStorage
    try {
      const storedEntry = localStorage.getItem(key);
      if (storedEntry) {
        const entry: CacheEntry<T> = JSON.parse(storedEntry);
        if (this.isValid(entry)) {
          // Restore to memory cache
          this.cache.set(key, entry);
          return entry.data;
        } else {
          // Remove expired entry
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.warn('Failed to retrieve cache from localStorage:', error);
    }

    return null;
  }

  private isValid<T>(entry: CacheEntry<T>): boolean {
    const now = Date.now();
    return (now - entry.timestamp) < entry.ttl;
  }

  clear(): void {
    this.cache.clear();
    // Clear localStorage entries that match our pattern
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('github-media-')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear localStorage cache:', error);
    }
  }

  remove(key: string): void {
    this.cache.delete(key);
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove cache from localStorage:', error);
    }
  }

  // Get cache statistics
  getStats(): { memorySize: number; localStorageSize: number } {
    let localStorageSize = 0;
    try {
      const keys = Object.keys(localStorage);
      localStorageSize = keys.filter(key => key.startsWith('github-media-')).length;
    } catch (error) {
      console.warn('Failed to get localStorage stats:', error);
    }

    return {
      memorySize: this.cache.size,
      localStorageSize
    };
  }

  // Clear expired entries
  cleanup(): void {
    // Clean memory cache
    for (const [key, entry] of this.cache.entries()) {
      if (!this.isValid(entry)) {
        this.cache.delete(key);
      }
    }

    // Clean localStorage
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('github-media-')) {
          const storedEntry = localStorage.getItem(key);
          if (storedEntry) {
            try {
              const entry: CacheEntry<any> = JSON.parse(storedEntry);
              if (!this.isValid(entry)) {
                localStorage.removeItem(key);
              }
            } catch (error) {
              // Remove invalid entries
              localStorage.removeItem(key);
            }
          }
        }
      });
    } catch (error) {
      console.warn('Failed to cleanup localStorage cache:', error);
    }
  }
}

export const cache = BrowserCache.getInstance();

// Helper function to generate cache keys
export const generateCacheKey = (owner: string, repo: string, path: string): string => {
  return `github-media-${owner}-${repo}-${path}`;
};

// Utility functions for common cache TTL values
export const CACHE_TTL = {
  FIVE_MINUTES: 5 * 60 * 1000,
  FIFTEEN_MINUTES: 15 * 60 * 1000,
  THIRTY_MINUTES: 30 * 60 * 1000,
  ONE_HOUR: 60 * 60 * 1000,
  TWO_HOURS: 2 * 60 * 60 * 1000,
  SIX_HOURS: 6 * 60 * 60 * 1000,
  TWELVE_HOURS: 12 * 60 * 60 * 1000,
  ONE_DAY: 24 * 60 * 60 * 1000,
} as const;

// Helper function to format TTL for display
export const formatTtl = (ttl: number): string => {
  const minutes = Math.floor(ttl / (60 * 1000));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return `${Math.floor(ttl / 1000)} second${Math.floor(ttl / 1000) > 1 ? 's' : ''}`;
  }
}; 