import React, { useState, useEffect, useCallback } from 'react';
import { QuizQuestion } from '../types';
import { generateQuizQuestion } from '../services/geminiService';
import { Loader2, CheckCircle, XCircle, Trophy, RefreshCw, HelpCircle, ArrowRight, Lightbulb } from 'lucide-react';

const QuizGame: React.FC = () => {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const loadQuestion = useCallback(async () => {
    setLoading(true);
    setSelectedAnswer(null);
    try {
      const q = await generateQuizQuestion();
      setQuestion(q);
      // Shuffle options (correct + incorrect)
      const allOptions = [...q.incorrectAnswers, q.correctAnswer];
      for (let i = allOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
      }
      setOptions(allOptions);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuestion();
  }, [loadQuestion]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer || !question) return;
    
    setSelectedAnswer(answer);
    if (answer === question.correctAnswer) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  if (loading && !question) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] text-slate-400 px-4 text-center">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-indigo-500" />
        <p className="text-sm md:text-base">Preparing your next challenge...</p>
      </div>
    );
  }

  if (!question) return null;

  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="w-full max-w-2xl mx-auto px-1 sm:px-0">
      <style>{`
        @keyframes fallOut {
          0% { transform: translateY(0) rotate(0); opacity: 1; }
          20% { transform: translateY(-10px) rotate(-2deg); }
          100% { transform: translateY(600px) rotate(25deg); opacity: 0; }
        }
        .animate-fall {
          animation: fallOut 0.8s cubic-bezier(0.4, 0, 1, 1) forwards;
          pointer-events: none;
        }
      `}</style>

      {/* Score Header */}
      <div className="flex justify-between items-center mb-4 md:mb-6 bg-white p-3 md:p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 text-amber-500 font-bold text-sm md:text-base">
          <Trophy className="w-4 h-4 md:w-5 md:h-5" />
          <span>Score: {score}</span>
        </div>
        <div className="flex items-center gap-2 text-indigo-600 font-medium text-xs md:text-sm">
          <span>Streak: {streak} 🔥</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 relative">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 md:p-10 text-center relative overflow-hidden rounded-t-2xl md:rounded-t-3xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_120%,#fff_0%,transparent_50%)]" />
          
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-[10px] md:text-xs font-semibold rounded-full backdrop-blur-sm mb-4">
            Translate this {question.sourceLang} word
          </span>
          
          <h2 className={`text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 break-words px-2 ${question.sourceLang === 'Arabic' ? 'font-arabic leading-relaxed' : ''}`}>
            {question.questionWord}
          </h2>

          {question.hint && (
            <div className="flex items-center justify-center gap-2 text-indigo-100 text-[11px] md:text-sm opacity-80">
              <HelpCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>{question.hint}</span>
            </div>
          )}
        </div>

        <div className="p-4 md:p-8 overflow-hidden rounded-b-2xl md:rounded-b-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 relative">
            {options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isActualCorrect = option === question.correctAnswer;
              
              let btnClass = "bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 relative z-10";
              
              if (isAnswered) {
                if (isActualCorrect) {
                  btnClass = "bg-green-100 border-green-500 text-green-800 ring-2 ring-green-500 z-20 shadow-lg scale-105";
                } else {
                  btnClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-50 animate-fall";
                  if (isSelected) {
                     btnClass = "bg-red-100 border-red-500 text-red-800 animate-fall";
                  }
                }
              }

              // Split Arabic and English for bigger, equal font styling
              let arabicPart = option;
              let englishPart = '';
              if (option.includes(' (')) {
                  const parts = option.split(' (');
                  arabicPart = parts[0];
                  englishPart = parts[1].replace(')', '');
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={`p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2 group ${btnClass}`}
                >
                  <span className="font-arabic text-2xl md:text-3xl font-bold leading-relaxed">{arabicPart}</span>
                  {englishPart && (
                    <span className="text-2xl md:text-3xl font-bold">{englishPart}</span>
                  )}
                  <div className="flex items-center justify-center mt-1">
                    {isAnswered && isActualCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                    {isAnswered && isSelected && !isActualCorrect && <XCircle className="w-6 h-6 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {isAnswered && (
            <div className={`mt-6 md:mt-8 p-4 md:p-6 rounded-xl md:rounded-2xl animate-fade-in-up border ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center justify-between">
                <div className="flex-1 w-full">
                  <div className={`font-bold text-lg md:text-xl mb-1 md:mb-2 flex items-center gap-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? (
                      <>
                        <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                        Richtig!
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 md:w-6 md:h-6" />
                        Not quite.
                      </>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-slate-700">
                    {!isCorrect && (
                       <p className="text-sm md:text-lg">The correct answer is <span className="font-bold text-slate-900">{question.correctAnswer}</span>.</p>
                    )}
                    {question.explanation && (
                      <div className="flex items-start gap-2 text-slate-600 bg-white/60 p-2 md:p-3 rounded-lg mt-2 text-xs md:text-sm">
                        <Lightbulb className="w-3.5 h-3.5 md:w-4 md:h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                        <p>{question.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={loadQuestion}
                  className="w-full md:w-auto px-6 md:px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform active:scale-95 text-sm md:text-base"
                >
                  Next Word <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Loading Overlay for Next Question */}
          {loading && isAnswered && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center mt-6">
        <button 
          onClick={loadQuestion} 
          disabled={loading}
          className="text-slate-400 hover:text-indigo-600 text-xs md:text-sm font-medium flex items-center justify-center gap-1 mx-auto transition-colors p-2"
        >
          <RefreshCw className="w-3 h-3" /> Skip Question
        </button>
      </div>
    </div>
  );
};

export default QuizGame;