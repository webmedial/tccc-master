
export enum Topic {
  GENERAL = "Allgemeines TYPO3 Wissen & Ökosystem",
  ASSOCIATION = "TYPO3 Association & Community",
  LICENSING = "GPL & Lizenzierung",
  SECURITY = "Sicherheit & Hardening",
  ARCHITECTURE = "Architektur & Hosting",
  EXTENSIONS = "Extensions & Composer",
  PROJECT_MGMT = "Projektmanagement & Agile",
  SEO = "SEO & Marketing",
  ACCESSIBILITY = "Barrierefreiheit (Accessibility)"
}

export interface BilingualContent {
  de: string;
  en: string;
}

export interface BilingualArray {
  de: string[];
  en: string[];
}

export interface Question {
  id: string;
  text: BilingualContent;
  options: BilingualArray;
  correctIndices: number[]; 
  explanation: BilingualContent;
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  answers: number[][]; // Array of selected indices arrays
  isFinished: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SetResult {
  score: number;
  total: number;
  passed: boolean; // >= 75%
  timestamp: number;
  isComplete: boolean; // True if quiz finished, False if in progress
  currentIndex: number; // 0-based index of the next question to answer
}

// Map Topic -> SetID -> Result
export type UserProgress = Record<string, Record<number, SetResult>>;

export type View = 'DASHBOARD' | 'SET_SELECTION' | 'QUIZ' | 'RESULTS';