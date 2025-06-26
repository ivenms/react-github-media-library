# React GitHub Media Library

[**Live Demo**](https://ivenms.github.io/react-github-media-library/)

A beautiful, production-ready React component for displaying and playing media files from GitHub repositories. Perfect for creating media galleries, content libraries, educational platforms, and more.

## Features

- 🎵 **Multi-format Support**: Audio (MP3, WAV, M4A, OGG) and Video (MP4, WebM)
- 🎨 **Beautiful Design**: Modern, responsive UI with smooth animations
- 🔍 **Search & Filter**: Real-time search and category filtering
- 🌙 **Theme Support**: Light and dark themes
- 📱 **Mobile Responsive**: Works perfectly on all devices
- ⚡ **TypeScript**: Full TypeScript support with type definitions
- 🎛️ **Customizable**: Extensive customization options
- 🔒 **GitHub Integration**: Secure GitHub API integration with optional token support

## Installation

```bash
npm install react-github-media-library
```

## Usage

> **Note:** This library requires React 16.8+ as a peer dependency.
>
> **Important:** This library uses GitHub's public API which has a rate limit of 60 requests per hour per IP address for unauthenticated requests. For more information about GitHub API rate limits, see [GitHub's documentation](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api).

Import and use the `GitHubMediaLibrary` component in your React app:

```tsx
import React from 'react';
import { GitHubMediaLibrary } from 'react-github-media-library';
import 'react-github-media-library/dist/style.css';

function App() {
  return (
    <GitHubMediaLibrary
      owner="your-username"
      repo="your-media-repo"
      mediaFolderPath="media" // optional, defaults to 'media'
      thumbnailFolderPath="thumbnails" // optional, defaults to 'thumbnails'
      theme="light"
    />
  );
}
```

## Repository Structure

Your GitHub repository should be organized like this:

```
your-media-repo/
├── media/
│   ├── Tutorial_React-Basics_John-Smith.mp3
│   ├── Music_Jazz-Collection_Miles-Davis.mp4
│   └── Podcast_Tech-Talk_Jane-Doe.wav
└── thumbnails/
    ├── Tutorial_React-Basics_John-Smith.jpg
    ├── Music_Jazz-Collection_Miles-Davis.jpg
    └── Podcast_Tech-Talk_Jane-Doe.jpg
```

### File Naming Convention

Files should follow this pattern: `Category_Title_Author.extension`

- **Category**: The type of content (Tutorial, Music, Podcast, etc.)
- **Title**: The title of the media
- **Author**: The creator/speaker name
- Use hyphens (-) instead of spaces in each part

Examples:
- `Tutorial_JavaScript-Fundamentals_John-Doe.mp3`
- `Music_Classical-Symphony_Orchestra.mp4`
- `Podcast_Tech-News_Jane-Smith.wav`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `owner` | `string` | **Required** | GitHub repository owner |
| `repo` | `string` | **Required** | GitHub repository name |
| `mediaFolderPath` | `string` | `"media"` | Path to media files in repo |
| `thumbnailFolderPath` | `string` | `"thumbnails"` | Path to thumbnail images |
| `githubToken` | `string` | `undefined` | GitHub personal access token (for private repos) |
| `theme` | `"light" \| "dark"` | `"light"` | UI theme |
| `showSearch` | `boolean` | `true` | Show search functionality |
| `showFilter` | `boolean` | `true` | Show category filter |
| `categories` | `string[]` | Auto-detected | Custom category list |
| `className` | `string` | `""` | Additional CSS classes |
| `onMediaSelect` | `(media: MediaItem) => void` | `undefined` | Callback when media is selected |
| `defaultThumbnailUrl` | `string` | `undefined` | URL for a fallback thumbnail image if a media thumbnail is missing |
| `cacheTtl` | `number` | `3600000` (1 hour) | Cache TTL in milliseconds to avoid API rate limits |

## Advanced Usage

### Custom File Name Parser

```tsx
<GitHubMediaLibrary
  owner="your-username"
  repo="your-repo"
  fileNameParser={(fileName) => {
    // Custom parsing logic
    const parts = fileName.split('_');
    return {
      category: parts[0] || 'General',
      title: parts[1] || 'Untitled',
      author: parts[2] || 'Unknown'
    };
  }}
/>
```

### Custom Thumbnail URLs

```tsx
<GitHubMediaLibrary
  owner="your-username"
  repo="your-repo"
  customThumbnailUrl={(fileName) => {
    return `https://your-cdn.com/thumbnails/${fileName}`;
  }}
/>
```

### Dark Theme

```tsx
<GitHubMediaLibrary
  owner="your-username"
  repo="your-repo"
  theme="dark"
  className="custom-media-library"
/>
```

### Event Handling

```tsx
<GitHubMediaLibrary
  owner="your-username"
  repo="your-repo"
  onMediaSelect={(media) => {
    console.log('Playing:', media.title);
    // Analytics, logging, etc.
  }}
/>
```

### Default Thumbnail Example

```tsx
<GitHubMediaLibrary
  owner="your-username"
  repo="your-repo"
  defaultThumbnailUrl="/path/to/your/default-thumbnail.jpg" // fallback image
/>
```

## Styling

The component uses Tailwind CSS classes internally. You can override styles using CSS or by passing custom classes:

```css
.custom-media-library {
  /* Your custom styles */
}
```

## GitHub Token (Optional)

For private repositories or to increase API rate limits, provide a GitHub personal access token:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `repo` scope
3. Pass it to the component:

```tsx
<GitHubMediaLibrary
  owner="your-username"
  repo="private-repo"
  githubToken="your-github-token"
/>
```

## Caching (Optional)

To avoid hitting GitHub API rate limits and improve performance, the library includes built-in caching functionality. The cache stores API responses in both memory and localStorage for persistence across page reloads.

### Basic Caching

```tsx
import { GitHubMediaLibrary } from 'react-github-media-library';
import { CACHE_TTL } from 'react-github-media-library';

<GitHubMediaLibrary
  owner="your-username"
  repo="your-repo"
  cacheTtl={CACHE_TTL.THIRTY_MINUTES} // Cache for 30 minutes
/>
```

### Available Cache TTL Options

```tsx
import { CACHE_TTL } from 'react-github-media-library';

// Predefined cache durations
CACHE_TTL.FIVE_MINUTES     // 5 minutes
CACHE_TTL.FIFTEEN_MINUTES  // 15 minutes
CACHE_TTL.THIRTY_MINUTES   // 30 minutes
CACHE_TTL.ONE_HOUR         // 1 hour (default)
CACHE_TTL.TWO_HOURS        // 2 hours
CACHE_TTL.SIX_HOURS        // 6 hours
CACHE_TTL.TWELVE_HOURS     // 12 hours
CACHE_TTL.ONE_DAY          // 24 hours

// Custom duration (in milliseconds)
cacheTtl={45 * 60 * 1000} // 45 minutes
```

### Cache Management

The library automatically:
- Checks for cached data before making API calls
- Stores successful API responses in cache
- Cleans up expired cache entries
- Persists cache across browser sessions using localStorage

### Cache Utilities

```tsx
import { cache, formatTtl } from 'react-github-media-library';

// Get cache statistics
const stats = cache.getStats();
console.log(`Memory entries: ${stats.memorySize}, localStorage entries: ${stats.localStorageSize}`);

// Clear all cache
cache.clear();

// Format TTL for display
const ttlDisplay = formatTtl(CACHE_TTL.ONE_HOUR); // "1 hour"
```

### Cache Behavior

- **Cache Key**: Generated based on `owner`, `repo`, and `mediaFolderPath`
- **Storage**: Both memory (for current session) and localStorage (for persistence)
- **Expiration**: Automatic cleanup of expired entries
- **Fallback**: If cache is unavailable, falls back to direct API calls

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import { MediaItem, GitHubMediaLibraryProps } from 'react-github-media-library';

const handleMediaSelect = (media: MediaItem) => {
  console.log(media.title, media.author, media.category);
};
```

## Project Structure & Utilities

This library is built with a modular architecture that separates concerns and promotes reusability. Here's the internal structure and utilities used by the project:

### Project Structure

```
src/
├── components/           # React components
│   ├── GitHubMediaLibrary.tsx    # Main component
│   ├── MediaCard.tsx             # Individual media item display
│   ├── MediaPlayer.tsx           # Audio/video player modal
│   ├── SearchAndFilter.tsx       # Search and filter controls
│   ├── ErrorMessage.tsx          # Error display component
│   └── LoadingSpinner.tsx        # Loading indicator
├── hooks/               # Custom React hooks
│   └── useGitHubMedia.ts         # GitHub API integration
├── utils/               # Utility functions
│   ├── index.ts                 # Main export file
│   ├── date.ts                  # Date formatting utilities
│   ├── error.ts                 # Error message processing
│   ├── category.ts              # Category management
│   ├── file.ts                  # File-related utilities
│   └── theme.ts                 # Theme utilities
├── types/               # TypeScript type definitions
│   └── index.ts                 # Main type exports
└── assets/              # Static assets
    └── default-thumbnail.svg    # Default thumbnail image
```

### Utility Functions

The library includes several utility functions that handle common operations:

#### 1. Error Message Processing (`utils/error.ts`)
Converts technical error messages into user-friendly messages:
```typescript
import { getFriendlyErrorMessage } from 'react-github-media-library';

const userMessage = getFriendlyErrorMessage('API rate limit exceeded');
// Returns: "The limit to watch the media library with in last hour has been reached. Please try again later."
```

#### 2. Category Management (`utils/category.ts`)
Handles category-related operations:
```typescript
import { getCategoryColor, extractUniqueCategories } from 'react-github-media-library';

// Get consistent color for category badges
const color = getCategoryColor('Tutorial', ['Tutorial', 'Music', 'Podcast']);

// Extract unique categories from media items
const categories = extractUniqueCategories(mediaItems);
```

#### 3. File Utilities (`utils/file.ts`)
File-related helper functions:
```typescript
import { formatFileSize, isVideoFile, isAudioFile } from 'react-github-media-library';

// Format file size
const size = formatFileSize(1048576); // "1.0 MB"

// Check file types
const isVideo = isVideoFile('video.mp4'); // true
const isAudio = isAudioFile('audio.mp3'); // true
```

#### 4. Theme Utilities (`utils/theme.ts`)
Theme-related helper functions:
```typescript
import { isDarkTheme, getThemeClasses } from 'react-github-media-library';

// Check if theme is dark
const isDark = isDarkTheme('dark'); // true

// Get theme-specific CSS classes
const classes = getThemeClasses('dark');
// Returns object with background, text, border classes
```

#### 5. Date Formatting (`utils/date.ts`)
Date formatting utilities:
```typescript
import { formatMediaDate } from 'react-github-media-library';

// Format date string
const formatted = formatMediaDate('2025-01-15'); // "15th Jan 25"
```

### Benefits of This Architecture

- **Modularity**: Each utility has a single responsibility
- **Reusability**: Functions can be used across multiple components
- **Maintainability**: Changes to common logic only need to be made in one place
- **Testability**: Utility functions can be easily unit tested
- **Type Safety**: Full TypeScript support with proper type definitions
- **Consistency**: Ensures uniform behavior throughout the application

### Component Architecture

The library follows a component-based architecture where:

- **GitHubMediaLibrary**: Main orchestrator component that manages state and coordinates other components
- **MediaCard**: Presentational component for individual media items
- **MediaPlayer**: Modal component for playing audio/video content
- **SearchAndFilter**: Form controls for search and filtering
- **ErrorMessage**: Error display with retry functionality
- **LoadingSpinner**: Loading state indicator

Each component is designed to be:
- **Focused**: Single responsibility
- **Reusable**: Can be used independently
- **Customizable**: Accepts props for customization
- **Accessible**: Follows accessibility best practices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/ivenms/react-github-media-library/issues) on GitHub.
