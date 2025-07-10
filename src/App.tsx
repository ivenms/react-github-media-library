import { useState } from 'react';
import { GitHubMediaLibrary } from './components/GitHubMediaLibrary';
import { Theme } from './types';
import { CACHE_TTL } from './utils';

function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`App ${isDark ? 'rgml-bg-gray-900' : 'rgml-bg-gray-50'} rgml-min-h-screen`}>
      <header className={`${isDark ? 'rgml-bg-gray-800 rgml-border-gray-700' : 'rgml-bg-white'} rgml-shadow-sm rgml-border-b`}>
        <div className="rgml-max-w-7xl rgml-mx-auto rgml-px-4 rgml-py-6 rgml-flex rgml-justify-between rgml-items-center">
          <div>
            <h1 className={`rgml-text-3xl rgml-font-bold ${isDark ? 'rgml-text-white' : 'rgml-text-gray-900'}`}>
              Media Library
            </h1>
            <p className={`rgml-text-lg rgml-mt-2 ${isDark ? 'rgml-text-gray-300' : 'rgml-text-gray-600'}`}>
              Browse and play your media collection
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`rgml-px-4 rgml-py-2 rgml-rounded-lg ${
              isDark 
                ? 'rgml-bg-gray-700 rgml-text-white hover:rgml-bg-gray-600' 
                : 'rgml-bg-gray-100 rgml-text-gray-800 hover:rgml-bg-gray-200'
            } rgml-transition-colors`}
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
        cacheTtl={CACHE_TTL.FIFTEEN_MINUTES}
        onMediaSelect={(media) => {
          console.log('Selected media:', media);
        }}
      />
    </div>
  );
}

export default App;
