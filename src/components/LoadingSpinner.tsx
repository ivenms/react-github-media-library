import React from 'react';

interface LoadingSpinnerProps {
  theme?: 'light' | 'dark';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className={`w-12 h-12 rounded-full border-4 ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}></div>
        <div className={`absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-blue-500 animate-spin`}></div>
      </div>
      <span className={`ml-3 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        Loading media files...
      </span>
    </div>
  );
};
