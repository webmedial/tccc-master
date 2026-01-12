import { Topic, UserProgress, SetResult } from '../types';

const STORAGE_KEY = 'tccc_user_progress_v1';

export const loadProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error("Failed to load progress from LocalStorage", e);
    return {};
  }
};

export const saveSetProgress = (
    topic: Topic, 
    setId: number, 
    score: number, 
    total: number, 
    isComplete: boolean, 
    currentIndex: number
): UserProgress => {
  const currentProgress = loadProgress();
  
  if (!currentProgress[topic]) {
    currentProgress[topic] = {};
  }

  const passed = isComplete ? (score / total) >= 0.75 : false;

  const result: SetResult = {
    score,
    total,
    passed,
    timestamp: Date.now(),
    isComplete,
    currentIndex
  };

  currentProgress[topic][setId] = result;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentProgress));
  } catch (e) {
    console.error("Failed to save progress", e);
  }

  return currentProgress;
};

export const clearProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
};