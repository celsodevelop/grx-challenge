import { Statistics } from '../types';

// CORS
export const CLIENT_ADDRESS = process.env.CLIENT_ADDRESS || 'http://localhost:3000';
// STORAGE
export const DATA_STORAGE_PATH = 'data/answers.txt';
// SCORE_ANSWER
export const INITIAL_SCORE = {
  positives: 0,
  negatives: 0,
  not_avaliated: 0,
} as Statistics;
