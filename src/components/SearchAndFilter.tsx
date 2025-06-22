import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
  categories: string[];
  theme?: 'light' | 'dark';
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  categories,
  theme = 'light'
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <input
          type="text"
          placeholder="Search by title or author..."
          className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
            isDark 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500' 
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
          }`}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="relative">
        <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className={`pl-10 pr-8 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-w-[160px] ${
            isDark 
              ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
              : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'
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
