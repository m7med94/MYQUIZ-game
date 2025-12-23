import React from 'react';
import QuizGame from './components/QuizGame';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/50 flex flex-col">
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center flex-grow w-full">
         <div className="w-full animate-fade-in-up">
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