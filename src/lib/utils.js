import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind class names with conditional logic.
 * @param {...(string|Record<string, boolean>|undefined|null|false)} inputs
 * @returns {string}
 */
export const cn = (...inputs) => twMerge(clsx(inputs))
