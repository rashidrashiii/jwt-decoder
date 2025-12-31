import { format, formatDistanceToNow } from 'date-fns';

/**
 * Formats a date in a readable format
 */
export function formatDate(date: Date): string {
  return format(date, 'MMM dd, yyyy \'at\' h:mm a');
}

/**
 * Formats a date as relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

/**
 * Copies text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Formats JSON with syntax highlighting
 */
export function formatJSON(obj: any): string {
  return JSON.stringify(obj, null, 2);
}

/**
 * Truncates text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
