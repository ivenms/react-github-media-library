import React from 'react';
import { isDarkTheme } from '../utils';

interface LoadingSpinnerProps {
  theme?: 'light' | 'dark';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ theme = 'light' }) => {
  const isDark = isDarkTheme(theme);

  return (
    <div className="rgml-flex rgml-items-center rgml-justify-center rgml-py-12">
      <div className="rgml-relative">
        <div className={`rgml-w-12 rgml-h-12 rgml-rounded-full rgml-border-4 ${
          isDark ? 'rgml-border-gray-700' : 'rgml-border-gray-200'
        }`}></div>
        <div className={`rgml-absolute rgml-top-0 rgml-left-0 rgml-w-12 rgml-h-12 rgml-rounded-full rgml-border-4 rgml-border-transparent rgml-border-t-blue-500 rgml-animate-spin`}></div>
      </div>
      <span className={`rgml-ml-3 rgml-text-lg ${isDark ? 'rgml-text-gray-300' : 'rgml-text-gray-600'}`}>
        Loading media files...
      </span>
    </div>
  );
};
