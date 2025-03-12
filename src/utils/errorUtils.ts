/**
 * Formats an error into a user-friendly message
 */
export const formatError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

/**
 * Logs an error to the console with additional context
 */
export const logError = (error: unknown, context: string = ''): void => {
  const prefix = context ? `[${context}] ` : '';
  console.error(`${prefix}Error:`, error);
}; 