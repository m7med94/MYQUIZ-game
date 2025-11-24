
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DictionaryEntry, QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const dictionarySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    word: { type: Type.STRING, description: "The word searched by the user." },
    detectedLanguage: { type: Type.STRING, enum: ["German", "Arabic"], description: "The language of the input word." },
    phonetic: { type: Type.STRING, description: "IPA pronunciation or phonetic spelling." },
    partOfSpeech: { type: Type.STRING, description: "Noun, Verb, Adjective, etc." },
    gender: { type: Type.STRING, description: "For German nouns: 'der', 'die', 'das'. For Arabic: 'masculine', 'feminine'. Return 'N/A' if not applicable." },
    plural: { type: Type.STRING, description: "The plural form of the word if applicable, else null." },
    translation: { type: Type.STRING, description: "The translation of the word." },
    definition: { type: Type.STRING, description: "A concise definition or explanation of the word." },
    examples: {
      type: Type.ARRAY,
      description: "3 example sentences showing usage.",
      items: {
        type: Type.OBJECT,
        properties: {
          sentence: { type: Type.STRING, description: "The sentence in the source language." },
          translation: { type: Type.STRING, description: "The translation of the sentence." },
        },
        required: ["sentence", "translation"],
      },
    },
  },
  required: ["word", "detectedLanguage", "phonetic", "partOfSpeech", "translation", "definition", "examples"],
};

const quizSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    questionWord: { type: Type.STRING, description: "A random A1-B2 level word to test." },
    sourceLang: { type: Type.STRING, enum: ["German", "Arabic"] },
    correctAnswer: { type: Type.STRING, description: "The correct translation." },
    incorrectAnswers: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3 incorrect but plausible translations to serve as distractors."
    },
    hint: { type: Type.STRING, description: "A helpful hint like gender or context (e.g., 'Noun, feminine' or 'Used in formal contexts')." },
    explanation: { type: Type.STRING, description: "A brief, 1-sentence explanation of why this is correct, or a short usage example context." }
  },
  required: ["questionWord", "sourceLang", "correctAnswer", "incorrectAnswers", "explanation"]
};

export const lookupWord = async (query: string): Promise<DictionaryEntry> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a helpful German-Arabic dictionary for language learners. 
      Analyze the word: "${query}". 
      If it is German, provide the Arabic translation. 
      If it is Arabic, provide the German translation.
      Ensure you identify the grammatical gender correctly (Der/Die/Das for German).
      Provide 3 clear example sentences.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: dictionarySchema,
        systemInstruction: "You are an educational dictionary tool. Your definitions should be simple and clear for learners. Always provide the article (der/die/das) for German nouns.",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as DictionaryEntry;
  } catch (error) {
    console.error("Gemini lookup failed:", error);
    throw error;
  }
};

export const generateQuizQuestion = async (): Promise<QuizQuestion> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a random vocabulary quiz question for a German-Arabic learner.
      Randomly choose between a German word (to translate to Arabic) or an Arabic word (to translate to German).
      Select words suitable for A1, A2, or B1 levels.
      Include a brief explanation or context for the answer.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: quizSchema,
        systemInstruction: "You are a language tutor generating multiple-choice questions. Ensure incorrect answers are in the same language as the correct answer (the target language) and are distinct from each other.",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    
    return JSON.parse(text) as QuizQuestion;
  } catch (error) {
    console.error("Quiz generation failed:", error);
    throw error;
  }
}
