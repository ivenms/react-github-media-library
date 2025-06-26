/**
 * Converts technical error messages into user-friendly messages
 */
export function getFriendlyErrorMessage(error: string | null): string {
  if (!error) return '';
  
  const errorLower = error.toLowerCase();
  
  if (errorLower.includes('rate limit')) {
    return 'The limit to watch the media library with in last hour has been reached. Please try again later.';
  }
  
  if (errorLower.includes('not found')) {
    return 'The specified repository or folder could not be found. Please contact with the administrator.';
  }
  
  if (errorLower.includes('unauthorized')) {
    return 'Unauthorized access. Please check your GitHub token permissions.';
  }
  
  return error;
} 