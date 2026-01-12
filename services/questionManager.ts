import { Topic, Question } from '../types';
import { STATIC_QUESTIONS } from '../data/staticQuestions';

const STORAGE_KEY = 'tccc_question_bank_static_v1';

interface QuestionBank {
  [key: string]: Question[];
}

/**
 * Loads the full question bank.
 * In this "Static Mode", we prioritize the hardcoded questions.
 * We can optionally merge with localStorage if we want to store progress later,
 * but for now, STATIC_QUESTIONS is the Single Source of Truth.
 */
export const loadQuestionBank = (): QuestionBank => {
  // Directly return the static database.
  // This ensures 100% availability immediately.
  return STATIC_QUESTIONS;
};

export const getQuestionsForTopic = (topic: Topic): Question[] => {
  return STATIC_QUESTIONS[topic] || [];
};
