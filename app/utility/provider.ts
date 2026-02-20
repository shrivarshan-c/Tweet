import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

// A combined utility function for convenience
// Takes any number of class name inputs and merges them using tailwind-merge and clsx
function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]): string {
  return twMerge(clsx(inputs));
}
