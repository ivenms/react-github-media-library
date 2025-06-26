/**
 * Theme type definition
 */
export type Theme = 'light' | 'dark';

/**
 * Checks if the current theme is dark
 */
export function isDarkTheme(theme: Theme): boolean {
  return theme === 'dark';
}

/**
 * Gets theme-specific CSS classes for common elements
 */
export function getThemeClasses(theme: Theme) {
  const isDark = isDarkTheme(theme);
  
  return {
    // Background colors
    background: isDark ? 'rgml-bg-gray-800' : 'rgml-bg-white',
    backgroundSecondary: isDark ? 'rgml-bg-gray-900' : 'rgml-bg-gray-50',
    backgroundTertiary: isDark ? 'rgml-bg-gray-700' : 'rgml-bg-gray-200',
    
    // Text colors
    text: isDark ? 'rgml-text-white' : 'rgml-text-gray-900',
    textSecondary: isDark ? 'rgml-text-gray-300' : 'rgml-text-gray-600',
    textTertiary: isDark ? 'rgml-text-gray-400' : 'rgml-text-gray-500',
    
    // Border colors
    border: isDark ? 'rgml-border-gray-700' : 'rgml-border-gray-200',
    borderSecondary: isDark ? 'rgml-border-gray-600' : 'rgml-border-gray-300',
    
    // Input styles
    input: isDark 
      ? 'rgml-bg-gray-800 rgml-border-gray-700 rgml-text-white rgml-placeholder-gray-400' 
      : 'rgml-bg-white rgml-border-gray-200 rgml-text-gray-900 rgml-placeholder-gray-500',
    
    // Button hover states
    buttonHover: isDark ? 'hover:rgml-bg-gray-700' : 'hover:rgml-bg-gray-200',
    
    // Card styles
    card: isDark 
      ? 'rgml-bg-gray-800 rgml-border rgml-border-gray-700' 
      : 'rgml-bg-white',
  };
} 