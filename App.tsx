import React, { useState, useEffect, useCallback } from 'react';
import { Book, Sparkles, Gamepad2, Search as SearchIcon } from 'lucide-react';
import SearchBar from './components/SearchBar';
import ResultCard from './components/ResultCard';
import HistoryPanel from './components/HistoryPanel';
import QuizGame from './components/QuizGame';
import { lookupWord } from './services/geminiService';
import { DictionaryEntry, SearchHistoryItem } from './types';

type ViewMode = 'dictionary' | 'quiz';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('dictionary');
  const [result, setResult] = useState<DictionaryEntry | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('al-brucke-history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveHistory = useCallback((entry: DictionaryEntry) => {
    setHistory((prev) => {
      // Remove duplicates
      const filtered = prev.filter(h => h.word.toLowerCase() !== entry.word.toLowerCase());
      const newItem: SearchHistoryItem = {
        word: entry.word,
        translation: entry.translation,
        timestamp: Date.now()
      };
      const newHistory = [newItem, ...filtered].slice(0, 10); // Keep last 10
      localStorage.setItem('al-brucke-history', JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const handleSearch = async (term: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    // Ensure we switch to dictionary view when searching
    setView('dictionary');

    try {
      const data = await lookupWord(term);
      setResult(data);
      saveHistory(data);
    } catch (err) {
      setError("Failed to find the word. Please try again or check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('al-brucke-history');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/50">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('dictionary')}>
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Book className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Al-Brücke <span className="text-indigo-600 font-arabic font-normal text-xl ml-1">الجسر</span>
            </h1>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setView('dictionary')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                view === 'dictionary' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <SearchIcon className="w-4 h-4" />
              Dictionary
            </button>
            <button
              onClick={() => setView('quiz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                view === 'quiz' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              Quiz Game
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center min-h-[calc(100vh-180px)]">
        
        {view === 'dictionary' ? (
          <>
            {/* Welcome / Empty State */}
            {!result && !isLoading && !error && (
              <div className="text-center mb-8 max-w-lg mt-8">
                 <div className="inline-block p-4 rounded-full bg-indigo-50 mb-6 text-indigo-500">
                   <Sparkles className="w-8 h-8" />
                 </div>
                 <h2 className="text-3xl font-bold text-slate-800 mb-3">
                   Start your language journey
                 </h2>
                 <p className="text-slate-500 text-lg mb-6">
                   Enter a German or Arabic word to get detailed translations, gender, and context-aware examples.
                 </p>
                 <button 
                   onClick={() => setView('quiz')}
                   className="text-indigo-600 font-medium hover:underline flex items-center justify-center gap-2"
                 >
                   <Gamepad2 className="w-4 h-4" /> Or practice with the Quiz Game
                 </button>
              </div>
            )}

            <SearchBar onSearch={handleSearch} isLoading={isLoading} />

            {error && (
              <div className="w-full max-w-2xl bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center mb-8">
                {error}
              </div>
            )}

            {result && (
              <div className="w-full animate-fade-in-up">
                <ResultCard data={result} />
              </div>
            )}

            <HistoryPanel 
              history={history} 
              onSelect={handleSearch} 
              onClear={handleClearHistory} 
            />
          </>
        ) : (
          <div className="w-full animate-fade-in-up mt-4">
             <QuizGame />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-400 text-sm flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>&copy; {new Date().getFullYear()} Al-Brücke Dictionary.</p>
          <p className="flex items-center gap-1">Built with <span className="text-red-400">❤</span> for learners.</p>
        </div>
      </footer>

      {/* Tailwind Animation Helper */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;