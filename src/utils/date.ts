// Utility to format a date string (YYYY-MM-DD) as '3rd Jun 25'
export function formatMediaDate(dateStr?: string): string {
  if (!dateStr || dateStr === 'Unknown') return '';
  const [year, month, day] = dateStr.split('-');
  if (!year || !month || !day) return '-';
  const dayNum = parseInt(day, 10);
  const yearShort = year.slice(2);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIdx = parseInt(month, 10) - 1;
  const monthShort = monthNames[monthIdx] || month;
  // Ordinal suffix
  const getOrdinal = (n: number) => {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  return `${dayNum}${getOrdinal(dayNum)} ${monthShort} ${yearShort}`;
} 