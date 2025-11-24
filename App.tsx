import React from 'react';
import { Gamepad2 } from 'lucide-react';
import QuizGame from './components/QuizGame';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/50 flex flex-col">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Al-Brücke <span className="text-indigo-600 font-arabic font-normal text-xl ml-1">الجسر</span>
              <span className="text-slate-400 text-sm font-normal ml-3 hidden sm:inline-block">German-Arabic Quiz</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col items-center flex-grow w-full">
         <div className="w-full animate-fade-in-up mt-4">
            <QuizGame />
         </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center text-slate-400 text-sm flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>&copy; {new Date().getFullYear()} Al-Brücke.</p>
          <p className="flex items-center gap-1">Master German vocabulary with AI.</p>
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