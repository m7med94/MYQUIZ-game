import React from 'react';
import { DictionaryEntry } from '../types';
import { Volume2, BookOpen, Repeat, ArrowRight } from 'lucide-react';

interface ResultCardProps {
  data: DictionaryEntry;
}

const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  const isGermanSource = data.detectedLanguage === 'German';

  const getArticleColor = (gender: string | null) => {
    if (!gender) return 'text-slate-500';
    const g = gender.toLowerCase();
    if (g === 'der') return 'text-blue-600';
    if (g === 'die') return 'text-red-600';
    if (g === 'das') return 'text-green-600';
    return 'text-slate-500';
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      {/* Header Section */}
      <div className="bg-indigo-50 p-8 border-b border-indigo-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className={`text-4xl font-bold text-slate-900 ${isGermanSource ? '' : 'font-arabic'}`}>
                {data.gender && isGermanSource && (
                  <span className={`text-2xl mr-2 font-medium ${getArticleColor(data.gender)}`}>
                    {data.gender}
                  </span>
                )}
                {data.word}
              </h2>
              <span className="text-slate-500 text-lg font-mono px-2 py-1 bg-white rounded-md border border-slate-200">
                /{data.phonetic}/
              </span>
            </div>
            <div className="flex items-center gap-3 mt-2 text-slate-600">
               <span className="bg-indigo-200 text-indigo-900 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                 {data.partOfSpeech}
               </span>
               {data.plural && (
                 <span className="text-sm">
                   Plural: <span className="font-semibold">{data.plural}</span>
                 </span>
               )}
            </div>
          </div>

          <div className="text-right md:text-right w-full md:w-auto">
             <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">Translation</div>
             <div className={`text-3xl font-bold text-indigo-700 ${!isGermanSource ? '' : 'font-arabic'}`}>
               {data.translation}
             </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Definition Column */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
             <div className="flex items-center gap-2 mb-3 text-amber-800 font-semibold">
               <BookOpen className="w-5 h-5" />
               <h3>Definition</h3>
             </div>
             <p className="text-slate-700 leading-relaxed">
               {data.definition}
             </p>
          </div>
        </div>

        {/* Examples Column */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold text-lg">
            <Repeat className="w-5 h-5 text-indigo-500" />
            <h3>Usage Examples</h3>
          </div>
          
          <div className="space-y-4">
            {data.examples.map((ex, idx) => (
              <div key={idx} className="group p-4 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md transition-all border border-slate-100">
                <div className={`text-lg text-slate-800 mb-1 ${isGermanSource ? '' : 'font-arabic'}`}>
                  {ex.sentence}
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <ArrowRight className="w-3 h-3 text-slate-300" />
                  <span className={`${!isGermanSource ? '' : 'font-arabic'}`}>{ex.translation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      
      {/* Footer / Meta */}
      <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between text-xs text-slate-400">
        <span>Detected Language: {data.detectedLanguage}</span>
        <span>Powered by Gemini AI</span>
      </div>
    </div>
  );
};

export default ResultCard;
