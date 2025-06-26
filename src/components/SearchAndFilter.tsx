import React from 'react';
import { Search, Filter } from 'lucide-react';
import { isDarkTheme } from '../utils';
import { SearchAndFilterProps } from '../types';

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  theme = 'light'
}) => {
  const isDark = isDarkTheme(theme);

  return (
    <div className="rgml-flex rgml-flex-col sm:rgml-flex-row rgml-gap-4 rgml-mb-8">
      <div className="rgml-relative rgml-flex-1">
        <Search className={`rgml-absolute rgml-left-3 rgml-top-1/2 rgml-transform -rgml-translate-y-1/2 rgml-w-5 rgml-h-5 ${
          isDark ? 'rgml-text-gray-400' : 'rgml-text-gray-500'
        }`} />
        <input
          type="text"
          placeholder="Search by title or author..."
          className={`rgml-w-full rgml-pl-10 rgml-pr-4 rgml-py-3 rgml-rounded-xl rgml-border-2 rgml-transition-all rgml-duration-200 focus:rgml-outline-none focus:rgml-ring-2 focus:rgml-ring-blue-500/20 ${
            isDark 
              ? 'rgml-bg-gray-800 rgml-border-gray-700 rgml-text-white rgml-placeholder-gray-400 focus:rgml-border-blue-500' 
              : 'rgml-bg-white rgml-border-gray-200 rgml-text-gray-900 rgml-placeholder-gray-500 focus:rgml-border-blue-500'
          }`}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="rgml-relative">
        <Filter className={`rgml-absolute rgml-left-3 rgml-top-1/2 rgml-transform -rgml-translate-y-1/2 rgml-w-5 rgml-h-5 ${
          isDark ? 'rgml-text-gray-400' : 'rgml-text-gray-500'
        }`} />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={`rgml-pl-10 rgml-pr-8 rgml-py-3 rgml-rounded-xl rgml-border-2 rgml-transition-all rgml-duration-200 focus:rgml-outline-none focus:rgml-ring-2 focus:rgml-ring-blue-500/20 rgml-min-w-[160px] ${
            isDark 
              ? 'rgml-bg-gray-800 rgml-border-gray-700 rgml-text-white focus:rgml-border-blue-500' 
              : 'rgml-bg-white rgml-border-gray-200 rgml-text-gray-900 focus:rgml-border-blue-500'
          }`}
        >
          <option value="All">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
