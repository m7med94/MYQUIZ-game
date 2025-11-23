import React from 'react';
import { SearchHistoryItem } from '../types';
import { Clock, Trash2 } from 'lucide-react';

interface HistoryPanelProps {
  history: SearchHistoryItem[];
  onSelect: (word: string) => void;
  onClear: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-slate-500 uppercase tracking-widest text-sm font-semibold flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Recent Searches
        </h3>
        <button 
          onClick={onClear}
          className="text-red-400 hover:text-red-600 text-xs flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3 h-3" /> Clear History
        </button>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {history.map((item, index) => (
          <button
            key={`${item.word}-${index}`}
            onClick={() => onSelect(item.word)}
            className="group flex flex-col items-start bg-white border border-slate-200 hover:border-indigo-300 hover:ring-2 hover:ring-indigo-100 rounded-lg px-4 py-2 transition-all"
          >
            <span className="font-medium text-slate-700 group-hover:text-indigo-700">
              {item.word}
            </span>
            <span className="text-xs text-slate-400 font-arabic">
              {item.translation}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;
