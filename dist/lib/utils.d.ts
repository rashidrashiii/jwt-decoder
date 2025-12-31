/**
 * Formats a date in a readable format
 */
export declare function formatDate(date: Date): string;
/**
 * Formats a date as relative time (e.g., "2 hours ago")
 */
export declare function formatRelativeTime(date: Date): string;
/**
 * Copies text to clipboard
 */
export declare function copyToClipboard(text: string): Promise<boolean>;
/**
 * Formats JSON with syntax highlighting
 */
export declare function formatJSON(obj: any): string;
/**
 * Truncates text with ellipsis
 */
export declare function truncate(text: string, maxLength: number): string;
//# sourceMappingURL=utils.d.ts.map