import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <form onSubmit={handleSubmit} className="relative group">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search for a word (German or Arabic)..."
          className="w-full px-6 py-4 text-lg bg-white rounded-full shadow-lg border-2 border-transparent focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-400 text-slate-800 pr-14"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !term.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors shadow-md"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Search className="w-6 h-6" />
          )}
        </button>
      </form>
      <p className="text-center text-slate-500 text-sm mt-3">
        Try searching for <span className="font-semibold text-indigo-600 cursor-pointer hover:underline" onClick={() => { setTerm('Schmetterling'); onSearch('Schmetterling'); }}>Schmetterling</span> or <span className="font-semibold text-indigo-600 cursor-pointer hover:underline font-arabic" onClick={() => { setTerm('سلام'); onSearch('سلام'); }}>سلام</span>
      </p>
    </div>
  );
};

export default SearchBar;
