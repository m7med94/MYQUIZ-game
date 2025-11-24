import { DictionaryEntry, QuizQuestion } from "../types";

// --- YOUR PERSONAL DICTIONARY ---
// Add as many words as you want here.
const LOCAL_DICTIONARY = [
  // --- BASICS & EXISTING WORDS ---
  

  // --- NEW WORDS ADDED FROM YOUR LIST ---
  {
    german: "die Umsetzung",
    arabic: "التنفيذ",
    hint: "Noun, Feminine",
    explanation: "Implementation or realization of a plan.",
    gender: "die",
    phonetic: "um-zet-sung"
  },
  {
    german: "erfordern",
    arabic: "يتطلب",
    hint: "Verb",
    explanation: "To require or demand something.",
    gender: null,
    phonetic: "er-for-dern"
  },
  {
    german: "die Glättung",
    arabic: "التنعيم",
    hint: "Noun, Feminine",
    explanation: "Smoothing something out.",
    gender: "die",
    phonetic: "glet-tung"
  },
  {
    german: "die Wahrnehmung",
    arabic: "الإدراك",
    hint: "Noun, Feminine",
    explanation: "Perception or awareness.",
    gender: "die",
    phonetic: "var-neh-mung"
  },
  {
    german: "die Fortsetzung",
    arabic: "الاستمرار / التكملة",
    hint: "Noun, Feminine",
    explanation: "Continuation of something.",
    gender: "die",
    phonetic: "fort-zet-sung"
  },
  {
    german: "die Abbildung",
    arabic: "الرسم التوضيحي",
    hint: "Noun, Feminine",
    explanation: "Illustration or figure.",
    gender: "die",
    phonetic: "ab-bil-dung"
  },
  {
    german: "das Abbild",
    arabic: "الصورة",
    hint: "Noun, Neuter",
    explanation: "Image or reflection.",
    gender: "das",
    phonetic: "ab-bild"
  },
  {
    german: "der Vorsatz",
    arabic: "النية / القصد",
    hint: "Noun, Masculine",
    explanation: "Intent or resolution.",
    gender: "der",
    phonetic: "for-zats"
  },
  {
    german: "der Geist",
    arabic: "الروح / الشبح",
    hint: "Noun, Masculine",
    explanation: "Ghost, spirit, or mind.",
    gender: "der",
    phonetic: "gaist"
  },
  {
    german: "zuweisen",
    arabic: "يعين / يخصص",
    hint: "Verb",
    explanation: "To assign something to someone.",
    gender: null,
    phonetic: "tsu-vai-zen"
  },
  {
    german: "abblitzen",
    arabic: "يرفض",
    hint: "Verb (Informal)",
    explanation: "To get rejected or brushed off.",
    gender: null,
    phonetic: "ab-blit-sen"
  },
  {
    german: "gegenseitig",
    arabic: "متبادل / مشترك",
    hint: "Adjective",
    explanation: "Mutual or reciprocal.",
    gender: null,
    phonetic: "gay-gen-zai-tig"
  },
  {
    german: "beliebig",
    arabic: "أي / عشوائي",
    hint: "Adjective",
    explanation: "Any or arbitrary.",
    gender: null,
    phonetic: "be-lee-big"
  },
  {
    german: "inkrementell",
    arabic: "تدريجي",
    hint: "Adjective",
    explanation: "Incremental.",
    gender: null,
    phonetic: "in-kre-men-tel"
  },
  {
    german: "der Anschluss",
    arabic: "الاتصال",
    hint: "Noun, Masculine",
    explanation: "Connection or plug.",
    gender: "der",
    phonetic: "an-shlus"
  },
  {
    german: "außerhalb",
    arabic: "خارج",
    hint: "Preposition",
    explanation: "Outside of an area.",
    gender: null,
    phonetic: "au-ser-halp"
  },
  {
    german: "sich verlassen auf",
    arabic: "يعتمد على",
    hint: "Verb",
    explanation: "To rely on someone.",
    gender: null,
    phonetic: "zich fer-las-sen"
  },
  {
    german: "flüstern",
    arabic: "يهمس",
    hint: "Verb",
    explanation: "To whisper.",
    gender: null,
    phonetic: "flus-tern"
  },
  {
    german: "bedeutsam",
    arabic: "مهم / ذو معنى",
    hint: "Adjective",
    explanation: "Significant or meaningful.",
    gender: null,
    phonetic: "be-doit-zam"
  },
  {
    german: "ratsam",
    arabic: "مستحسن",
    hint: "Adjective",
    explanation: "Advisable.",
    gender: null,
    phonetic: "rat-zam"
  },
  {
    german: "achtsam",
    arabic: "حذر / يقظ",
    hint: "Adjective",
    explanation: "Attentive or mindful.",
    gender: null,
    phonetic: "acht-zam"
  },
  {
    german: "gewaltsam",
    arabic: "عنيف / بالقوة",
    hint: "Adjective",
    explanation: "Violent or by force.",
    gender: null,
    phonetic: "ge-valt-zam"
  },
  {
    german: "psychisch",
    arabic: "نفسي",
    hint: "Adjective",
    explanation: "Mental or psychological.",
    gender: null,
    phonetic: "psü-hish"
  },
  {
    german: "schweigsam",
    arabic: "صامت / كتوم",
    hint: "Adjective",
    explanation: "Silent or taciturn.",
    gender: null,
    phonetic: "shvaig-zam"
  },
  {
    german: "befassen",
    arabic: "يتعامل مع",
    hint: "Verb",
    explanation: "To deal with or attend to.",
    gender: null,
    phonetic: "be-fas-sen"
  },
  {
    german: "machbar",
    arabic: "ممكن / مستطاع",
    hint: "Adjective",
    explanation: "Doable or feasible.",
    gender: null,
    phonetic: "mach-bar"
  },
  {
    german: "ansprechbar",
    arabic: "متجاوب",
    hint: "Adjective",
    explanation: "Responsive or approachable.",
    gender: null,
    phonetic: "an-shprech-bar"
  },
  {
    german: "heilbar",
    arabic: "قابل للشفاء",
    hint: "Adjective",
    explanation: "Curable.",
    gender: null,
    phonetic: "hail-bar"
  },
  {
    german: "das Bedürfnis",
    arabic: "الحاجة",
    hint: "Noun, Neuter",
    explanation: "Need or desire.",
    gender: "das",
    phonetic: "be-durf-nis"
  },
  {
    german: "die Lebensbedingungen",
    arabic: "الظروف المعيشية",
    hint: "Noun, Plural",
    explanation: "Living conditions.",
    gender: "die",
    phonetic: "leh-bens-be-ding-ung-en"
  },
  {
    german: "scheitern",
    arabic: "يفشل",
    hint: "Verb",
    explanation: "To fail.",
    gender: null,
    phonetic: "shai-tern"
  },
  {
    german: "der Übergang",
    arabic: "العبور / الانتقال",
    hint: "Noun, Masculine",
    explanation: "Transition or crossing.",
    gender: "der",
    phonetic: "u-ber-gang"
  },
  {
    german: "der Selbstmord",
    arabic: "الانتحار",
    hint: "Noun, Masculine",
    explanation: "Suicide.",
    gender: "der",
    phonetic: "zelbst-mord"
  },
  {
    german: "der Riss",
    arabic: "الشق / الشرخ",
    hint: "Noun, Masculine",
    explanation: "Crack or tear.",
    gender: "der",
    phonetic: "ris"
  },
  {
    german: "der Kreislauf",
    arabic: "الدورة الدموية",
    hint: "Noun, Masculine",
    explanation: "Circulation or cycle.",
    gender: "der",
    phonetic: "krais-lauf"
  },
  {
    german: "auflösen",
    arabic: "يذوب / يحل",
    hint: "Verb",
    explanation: "To dissolve or solve.",
    gender: null,
    phonetic: "auf-lo-zen"
  },
  {
    german: "die Ankündigung",
    arabic: "الإعلان",
    hint: "Noun, Feminine",
    explanation: "Announcement.",
    gender: "die",
    phonetic: "an-kun-di-gung"
  },
  {
    german: "sich wenden an",
    arabic: "يتوجه إلى / يتواصل مع",
    hint: "Verb",
    explanation: "To contact or turn to someone.",
    gender: null,
    phonetic: "ven-den"
  },
  {
    german: "der Ausschuss",
    arabic: "الجنة",
    hint: "Noun, Masculine",
    explanation: "Committee.",
    gender: "der",
    phonetic: "aus-shus"
  },
  {
    german: "vertraut machen",
    arabic: "يتعرف على",
    hint: "Verb",
    explanation: "To familiarize oneself.",
    gender: null,
    phonetic: "fer-traut ma-chen"
  },
  {
    german: "die Verzerrung",
    arabic: "التشوه",
    hint: "Noun, Feminine",
    explanation: "Distortion.",
    gender: "die",
    phonetic: "fer-tser-rung"
  },
  {
    german: "durchführen",
    arabic: "ينفذ",
    hint: "Verb",
    explanation: "To carry out or execute.",
    gender: null,
    phonetic: "durch-fu-ren"
  },
  {
    german: "die Ziffer",
    arabic: "الرقم / الخانة",
    hint: "Noun, Feminine",
    explanation: "Digit.",
    gender: "die",
    phonetic: "tsif-fer"
  },
  {
    german: "abheben",
    arabic: "يسحب (مال)",
    hint: "Verb",
    explanation: "To withdraw money or lift off.",
    gender: null,
    phonetic: "ab-heh-ben"
  },
  {
    german: "sich anfreunden",
    arabic: "يصادق",
    hint: "Verb",
    explanation: "To make friends.",
    gender: null,
    phonetic: "an-froin-den"
  },
  {
    german: "sich beschweren",
    arabic: "يشتكي",
    hint: "Verb",
    explanation: "To complain.",
    gender: null,
    phonetic: "be-shveh-ren"
  },
  {
    german: "sich entschuldigen",
    arabic: "يعتذر",
    hint: "Verb",
    explanation: "To apologize.",
    gender: null,
    phonetic: "ent-shul-di-gen"
  },
  {
    german: "gratulieren",
    arabic: "يهنئ",
    hint: "Verb",
    explanation: "To congratulate.",
    gender: null,
    phonetic: "gra-tu-lee-ren"
  },
  {
    german: "sich verteidigen",
    arabic: "يدافع عن نفسه",
    hint: "Verb",
    explanation: "To defend oneself.",
    gender: null,
    phonetic: "fer-tai-di-gen"
  },
  {
    german: "die Anschuldigung",
    arabic: "الاتهام",
    hint: "Noun, Feminine",
    explanation: "Accusation.",
    gender: "die",
    phonetic: "an-shul-di-gung"
  },
  {
    german: "beschuldigen",
    arabic: "يتهم",
    hint: "Verb",
    explanation: "To accuse someone.",
    gender: null,
    phonetic: "be-shul-di-gen"
  },
  {
    german: "widerlich",
    arabic: "مقرف",
    hint: "Adjective",
    explanation: "Disgusting or repulsive.",
    gender: null,
    phonetic: "vi-der-lich"
  },
  {
    german: "das Guthaben",
    arabic: "الرصيد",
    hint: "Noun, Neuter",
    explanation: "Credit or balance.",
    gender: "das",
    phonetic: "gut-ha-ben"
  },
  {
    german: "auftauen",
    arabic: "يذوب",
    hint: "Verb",
    explanation: "To thaw or defrost.",
    gender: null,
    phonetic: "auf-tau-en"
  },
  {
    german: "der Griff",
    arabic: "القبضة / المقبض",
    hint: "Noun, Masculine",
    explanation: "Grip or handle.",
    gender: "der",
    phonetic: "grif"
  },
  {
    german: "unumgänglich",
    arabic: "حتمي / لا مفر منه",
    hint: "Adjective",
    explanation: "Inevitable.",
    gender: null,
    phonetic: "un-um-geng-lich"
  },
  {
    german: "der Verstoß",
    arabic: "المخالفة",
    hint: "Noun, Masculine",
    explanation: "Violation or breach.",
    gender: "der",
    phonetic: "fer-shtos"
  },
  {
    german: "die Verteilung",
    arabic: "التوزيع",
    hint: "Noun, Feminine",
    explanation: "Distribution.",
    gender: "die",
    phonetic: "fer-tai-lung"
  },
  {
    german: "zwangsläufig",
    arabic: "حتمي",
    hint: "Adjective",
    explanation: "Inevitably.",
    gender: null,
    phonetic: "tsvangs-loi-fig"
  },
  {
    german: "der Aufbau",
    arabic: "البناء / التركيب",
    hint: "Noun, Masculine",
    explanation: "Construction or structure.",
    gender: "der",
    phonetic: "auf-bau"
  },
  {
    german: "vernachlässigen",
    arabic: "يهمل",
    hint: "Verb",
    explanation: "To neglect.",
    gender: null,
    phonetic: "fer-nach-les-si-gen"
  },
  {
    german: "schüchtern",
    arabic: "خجول",
    hint: "Adjective",
    explanation: "Shy.",
    gender: null,
    phonetic: "shuch-tern"
  },
  {
    german: "rückwirkend",
    arabic: "بأثر رجعي",
    hint: "Adjective",
    explanation: "Retroactive.",
    gender: null,
    phonetic: "ruk-vir-kend"
  },
  {
    german: "der Rückstand",
    arabic: "المتأخرات / التأخير",
    hint: "Noun, Masculine",
    explanation: "Backlog or arrears.",
    gender: "der",
    phonetic: "ruk-shtand"
  },
  {
    german: "die Belastung",
    arabic: "العبء",
    hint: "Noun, Feminine",
    explanation: "Burden or load.",
    gender: "die",
    phonetic: "be-las-tung"
  },
  {
    german: "schimpfen",
    arabic: "يوبخ / يشتم",
    hint: "Verb",
    explanation: "To scold or rant.",
    gender: null,
    phonetic: "shimp-fen"
  },
  {
    german: "ständig",
    arabic: "بشكل مستمر",
    hint: "Adjective",
    explanation: "Constant.",
    gender: null,
    phonetic: "shten-dig"
  },
  {
    german: "zocken",
    arabic: "يلعب / يقامر",
    hint: "Verb (Slang)",
    explanation: "To gamble or play video games.",
    gender: null,
    phonetic: "tso-ken"
  },
  {
    german: "gehorchen",
    arabic: "يطيع",
    hint: "Verb",
    explanation: "To obey.",
    gender: null,
    phonetic: "ge-hor-chen"
  },
  {
    german: "der Reißverschluss",
    arabic: "السحاب",
    hint: "Noun, Masculine",
    explanation: "Zipper.",
    gender: "der",
    phonetic: "rais-fer-shlus"
  }
];

// --- LOGIC TO MOCK THE AI SERVICE LOCALLY ---

export const lookupWord = async (query: string): Promise<DictionaryEntry> => {
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 300));

  const lowerQuery = query.toLowerCase().trim();
  
  // Find the word in the local list
  const match = LOCAL_DICTIONARY.find(item => 
    item.german.toLowerCase().includes(lowerQuery) || 
    item.arabic.includes(lowerQuery)
  );

  if (!match) {
    // Return a dummy error entry if not found locally
    return {
        word: query,
        detectedLanguage: "German",
        phonetic: "???",
        partOfSpeech: "Unknown",
        gender: "N/A",
        plural: null,
        translation: "Not found in local dictionary",
        definition: "Please add this word to services/geminiService.ts to see it.",
        examples: []
    };
  }

  const isGerman = match.german.toLowerCase().includes(lowerQuery);

  return {
    word: isGerman ? match.german : match.arabic,
    detectedLanguage: isGerman ? "German" : "Arabic",
    phonetic: match.phonetic,
    partOfSpeech: "Noun/Expression", // Simplified for local demo
    gender: match.gender,
    plural: null,
    translation: isGerman ? match.arabic : match.german,
    definition: match.explanation,
    examples: [{ sentence: isGerman ? match.german : match.arabic, translation: isGerman ? match.arabic : match.german }]
  };
};

export const generateQuizQuestion = async (): Promise<QuizQuestion> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));

  if (LOCAL_DICTIONARY.length < 4) {
      throw new Error("Local dictionary must have at least 4 words to generate a quiz.");
  }

  // 1. Pick a random word from the dictionary
  const targetIndex = Math.floor(Math.random() * LOCAL_DICTIONARY.length);
  const targetWord = LOCAL_DICTIONARY[targetIndex];

  // 2. Randomly decide if question is German -> Arabic OR Arabic -> German
  const isSourceGerman = Math.random() > 0.5;
  
  const questionWord = isSourceGerman ? targetWord.german : targetWord.arabic;
  const correctanswer = isSourceGerman ? targetWord.arabic : targetWord.german;
  const sourceLang = isSourceGerman ? "German" : "Arabic";

  // 3. Generate 3 unique incorrect answers
  const incorrectAnswers: string[] = [];
  const usedIndices = new Set([targetIndex]);

  while (incorrectAnswers.length < 3) {
      const randIndex = Math.floor(Math.random() * LOCAL_DICTIONARY.length);
      
      if (!usedIndices.has(randIndex)) {
          const wrongEntry = LOCAL_DICTIONARY[randIndex];
          const wrongWord = isSourceGerman ? wrongEntry.arabic : wrongEntry.german;
          
          incorrectAnswers.push(wrongWord);
          usedIndices.add(randIndex);
      }
  }

  return {
    questionWord: questionWord,
    sourceLang: sourceLang,
    correctAnswer: correctanswer,
    incorrectAnswers: incorrectAnswers,
    hint: targetWord.hint,
    explanation: targetWord.explanation
  };
}