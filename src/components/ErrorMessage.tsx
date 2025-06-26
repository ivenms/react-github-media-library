import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { isDarkTheme } from '../utils';
import { ErrorMessageProps } from '../types';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onRetry, 
  theme = 'light' 
}) => {
  const isDark = isDarkTheme(theme);

  return (
    <div className={`rgml-flex rgml-flex-col rgml-items-center rgml-justify-center rgml-py-12 rgml-px-4 rgml-rounded-xl ${
      isDark ? 'rgml-bg-gray-800 rgml-border rgml-border-gray-700' : 'rgml-bg-gray-50 rgml-border rgml-border-gray-200'
    }`}>
      <AlertCircle className={`rgml-w-12 rgml-h-12 rgml-mb-4 ${isDark ? 'rgml-text-red-400' : 'rgml-text-red-500'}`} />
      <h3 className={`rgml-text-lg rgml-font-semibold rgml-mb-2 ${isDark ? 'rgml-text-white' : 'rgml-text-gray-900'}`}>
        Failed to Load Media
      </h3>
      <p className={`rgml-text-center rgml-mb-4 ${isDark ? 'rgml-text-gray-300' : 'rgml-text-gray-600'}`}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rgml-flex rgml-items-center rgml-gap-2 rgml-px-4 rgml-py-2 rgml-bg-blue-500 hover:rgml-bg-blue-600 rgml-text-white rgml-rounded-lg rgml-transition-colors"
        >
          <RefreshCw className="rgml-w-4 rgml-h-4" />
          Try Again
        </button>
      )}
    </div>
  );
};
