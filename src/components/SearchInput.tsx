import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { useAtlas } from '../context/AtlasContext';

// Keywords for predictive suggestions
const KEYWORDS = [
  "ACCELERATOR", 
  "TRAVELADS", 
  "visibility products", 
  "partner adoption", 
  "conversion rates", 
  "pitch effectiveness", 
  "partner segments", 
  "friction points", 
  "best practices", 
  "call duration", 
  "talk-to-listen ratio", 
  "sentiment analysis", 
  "objection handling", 
  "success rates"
];

const SearchInput: React.FC = () => {
  const { state, setSearchValue } = useAtlas();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [predictiveSuggestions, setPredictiveSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [predictiveText, setPredictiveText] = useState<string>("");

  // Generate predictive suggestions based on input
  useEffect(() => {
    if (!state.searchValue) {
      setPredictiveSuggestions([]);
      setPredictiveText("");
      return;
    }

    const inputLower = state.searchValue.toLowerCase();
    const lastWord = inputLower.split(' ').pop() || "";
    
    // If typing a question pattern
    if (inputLower.includes("tell me") || 
        inputLower.includes("show me") || 
        inputLower.includes("what is") || 
        inputLower.includes("how to") ||
        inputLower.includes("difference between") ||
        inputLower.startsWith("compare")) {
      
      // Generate predictive completions
      const predictions = KEYWORDS
        .filter(keyword => keyword.toLowerCase().startsWith(lastWord) && lastWord.length > 0)
        .map(keyword => {
          // Complete the current sentence with the matching keyword
          const words = state.searchValue.split(' ');
          words.pop(); // Remove the last incomplete word
          return [...words, keyword].join(' ');
        });
      
      // If no direct matches, suggest completions based on context
      if (predictions.length === 0 && lastWord.length > 2) {
        // Create contextual suggestions
        if (inputLower.includes("difference between")) {
          setPredictiveSuggestions([
            `${state.searchValue} ACCELERATOR and TRAVELADS`,
            `${state.searchValue} successful and unsuccessful pitches`,
            `${state.searchValue} high and low conversion partners`
          ]);
        } else {
          // Default contextual suggestions
          setPredictiveSuggestions([
            `${state.searchValue} for ACCELERATOR`,
            `${state.searchValue} for TRAVELADS`,
            `${state.searchValue} across partner segments`
          ]);
        }
      } else {
        setPredictiveSuggestions(predictions);
      }
      
      // Set predictive text for inline completion
      if (predictions.length > 0) {
        setPredictiveText(predictions[0].substring(state.searchValue.length));
      } else {
        setPredictiveText("");
      }
    } else {
      // For non-question patterns, suggest full questions
      const matchingKeywords = KEYWORDS.filter(keyword => 
        keyword.toLowerCase().includes(lastWord) && lastWord.length > 1
      );
      
      if (matchingKeywords.length > 0) {
        const suggestions = [
          `Tell me about ${matchingKeywords[0]}`,
          `Show me data for ${matchingKeywords[0]}`,
          `What is the performance of ${matchingKeywords[0]}`
        ];
        setPredictiveSuggestions(suggestions);
      } else {
        setPredictiveSuggestions([]);
        setPredictiveText("");
      }
    }
  }, [state.searchValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission logic here
    console.log('Search submitted:', state.searchValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    inputRef.current?.focus();
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Accept predictive text with Tab
    if (e.key === 'Tab' && predictiveText) {
      e.preventDefault();
      setSearchValue(state.searchValue + predictiveText);
      return;
    }
    
    // Handle keyboard navigation
    if (showSuggestions && predictiveSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < predictiveSuggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
      } else if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
        e.preventDefault();
        handleSuggestionClick(predictiveSuggestions[selectedSuggestionIndex]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setShowSuggestions(false);
      }
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="relative w-full">
          <input
            ref={inputRef}
            type="text"
            value={state.searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about your data..."
            className="w-full h-14 px-5 py-4 bg-surface-elevated border border-border-subtle rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
          />
          
          {/* Inline predictive text */}
          {predictiveText && (
            <div className="absolute left-0 top-0 h-14 px-5 py-4 flex items-center pointer-events-none">
              <span className="invisible">{state.searchValue}</span>
              <span className="text-muted-foreground">{predictiveText}</span>
            </div>
          )}
          
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-colors duration-200"
            aria-label="Send query"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Autocomplete suggestions dropdown with smooth transition */}
        <div 
          ref={suggestionsRef}
          className={`absolute top-full left-0 right-0 mt-1 bg-surface-elevated border border-border-subtle rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-in-out ${
            showSuggestions && predictiveSuggestions.length > 0
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 -translate-y-1 scale-98 pointer-events-none'
          }`}
          style={{
            transformOrigin: 'top center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          {predictiveSuggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`px-4 py-3 cursor-pointer transition-all duration-150 ${
                index === selectedSuggestionIndex 
                  ? 'bg-surface-hover text-foreground font-medium' 
                  : 'hover:bg-surface-hover/50'
              }`}
            >
              {suggestion}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default SearchInput;