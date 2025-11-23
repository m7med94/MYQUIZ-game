export interface Example {
  sentence: string;
  translation: string;
}

export interface DictionaryEntry {
  word: string;
  detectedLanguage: 'German' | 'Arabic';
  phonetic: string;
  partOfSpeech: string;
  gender: 'der' | 'die' | 'das' | 'N/A' | string | null;
  plural: string | null;
  translation: string;
  definition: string;
  examples: Example[];
}

export interface SearchHistoryItem {
  word: string;
  translation: string;
  timestamp: number;
}

export interface QuizQuestion {
  questionWord: string;
  sourceLang: 'German' | 'Arabic';
  correctAnswer: string;
  incorrectAnswers: string[];
  hint?: string;
}