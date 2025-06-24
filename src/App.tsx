import { GitHubMediaLibrary } from './components/GitHubMediaLibrary';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`App ${isDark ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
      <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Media Library
            </h1>
            <p className={`text-lg mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Browse and play your media collection
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg ${
              isDark 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            } transition-colors`}
          >
            {isDark ? '🌞 Light' : '🌙 Dark'}
          </button>
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
