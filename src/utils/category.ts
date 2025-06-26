/**
 * Predefined colors for category badges
 */
export const CATEGORY_COLORS = [
  'rgml-bg-blue-500',
  'rgml-bg-purple-500',
  'rgml-bg-orange-500',
  'rgml-bg-indigo-500',
  'rgml-bg-green-500',
  'rgml-bg-red-500',
  'rgml-bg-pink-500',
  'rgml-bg-teal-500',
  'rgml-bg-gray-500'
] as const;

/**
 * Gets a consistent color for a category based on its position in the categories array
 */
export function getCategoryColor(category: string, allCategories: string[]): string {
  const categoryIndex = allCategories.indexOf(category);
  const colorIndex = categoryIndex >= 0 ? categoryIndex % CATEGORY_COLORS.length : 0;
  return CATEGORY_COLORS[colorIndex];
}

/**
 * Extracts unique categories from media items and sorts them
 */
export function extractUniqueCategories(mediaItems: Array<{ category: string }>): string[] {
  const uniqueCategories = [...new Set(mediaItems.map(item => item.category))];
  return uniqueCategories.sort();
} 