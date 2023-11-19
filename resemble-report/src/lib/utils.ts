import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import kraken from '../results/kraken/results.json';
import playwright from '../results/playwright/results.json';
import { ResembleResult } from '@/types/resemble';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const krakenResults: ResembleResult[] = kraken;
export const playwrightResults: ResembleResult[] = playwright;
