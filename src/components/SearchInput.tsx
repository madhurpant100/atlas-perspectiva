import React from 'react';
import { Send } from 'lucide-react';
import { useAtlas } from '../context/AtlasContext';

const SearchInput: React.FC = () => {
  const { state, setSearchValue } = useAtlas();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.searchValue.trim()) {
      console.log('Searching:', state.searchValue);
      // Here you would typically trigger the search
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-6 atlas-animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <form onSubmit={handleSubmit} className="atlas-search-container">
        <input
          type="text"
          value={state.searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="atlas-input pr-14"
          placeholder="Ask about your analytics data..."
          aria-label="Search analytics data"
        />
        <button
          type="submit"
          className="atlas-search-button"
          aria-label="Send search query"
          disabled={!state.searchValue.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;