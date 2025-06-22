import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  theme?: 'light' | 'dark';
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onRetry, 
  theme = 'light' 
}) => {
  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 rounded-xl ${
      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
    }`}>
      <AlertCircle className={`w-12 h-12 mb-4 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
      <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Failed to Load Media
      </h3>
      <p className={`text-center mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
};
