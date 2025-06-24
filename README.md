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

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import { MediaItem, GitHubMediaLibraryProps } from 'react-github-media-library';

const handleMediaSelect = (media: MediaItem) => {
  console.log(media.title, media.author, media.category);
};
```

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
