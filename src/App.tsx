import { GitHubMediaLibrary } from './components/GitHubMediaLibrary';

function App() {
  const theme: 'light' | 'dark' = 'light';
  const isDark = (theme as string) === 'dark';

  return (
    <div className="App">
      <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Media Library
          </h1>
          <p className={`text-lg mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Browse and play your media collection
          </p>
        </div>
      </header>
      <GitHubMediaLibrary
        owner="ivenms"
        repo="react-github-media-library"
        mediaFolderPath="demo/media"
        thumbnailFolderPath="demo/thumbnails"
        theme={theme}
        onMediaSelect={(media) => {
          console.log('Selected media:', media);
        }}
      />
    </div>
  );
}

export default App;
