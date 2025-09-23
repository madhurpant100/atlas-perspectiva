import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Feature Data
export const FEATURES = [
  { id: 'labs', label: 'Labs', icon: '🧪' },
  { id: 'deep', label: 'Deep Analysis', icon: '🔍' },
  { id: 'insights', label: 'Advanced Insights', icon: '⚡' },
  { id: 'compare', label: 'Smart Compare', icon: '📊' },
  { id: 'timeline', label: 'Timeline Mode', icon: '⏳' },
];

export const OVERFLOW_FEATURES = [
  { id: 'export', label: 'Export', icon: '⬇️' },
  { id: 'humanize', label: 'Humanize Data', icon: '🤖' },
  { id: 'trends', label: 'Trend Analysis', icon: '📈' },
  { id: 'segments', label: 'Segmentation', icon: '🎯' },
];

export const RECENT_QUERIES = [
  "Show me conversion rates by opportunity type",
  "What are the top objections from partners?", 
  "Compare performance across regions"
];

// Types
export interface Feature {
  id: string;
  label: string;
  icon: string;
}

export interface AtlasState {
  selectedFeature: string | null;
  searchValue: string;
  isDropdownOpen: boolean;
  recentQueries: string[];
}

// Action Types
type AtlasAction =
  | { type: 'SELECT_FEATURE'; payload: string }
  | { type: 'SET_SEARCH_VALUE'; payload: string }
  | { type: 'TOGGLE_DROPDOWN' }
  | { type: 'CLOSE_DROPDOWN' }
  | { type: 'SET_SEARCH_FROM_RECENT'; payload: string };

// Initial State
const initialState: AtlasState = {
  selectedFeature: null,
  searchValue: '',
  isDropdownOpen: false,
  recentQueries: RECENT_QUERIES,
};

// Reducer
const atlasReducer = (state: AtlasState, action: AtlasAction): AtlasState => {
  switch (action.type) {
    case 'SELECT_FEATURE':
      return { 
        ...state, 
        selectedFeature: state.selectedFeature === action.payload ? null : action.payload,
        isDropdownOpen: false
      };
    case 'SET_SEARCH_VALUE':
      return { ...state, searchValue: action.payload };
    case 'TOGGLE_DROPDOWN':
      return { ...state, isDropdownOpen: !state.isDropdownOpen };
    case 'CLOSE_DROPDOWN':
      return { ...state, isDropdownOpen: false };
    case 'SET_SEARCH_FROM_RECENT':
      return { ...state, searchValue: action.payload };
    default:
      return state;
  }
};

// Context
interface AtlasContextType {
  state: AtlasState;
  dispatch: React.Dispatch<AtlasAction>;
  selectFeature: (featureId: string) => void;
  setSearchValue: (value: string) => void;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  setSearchFromRecent: (query: string) => void;
}

const AtlasContext = createContext<AtlasContextType | undefined>(undefined);

// Provider
export const AtlasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(atlasReducer, initialState);

  const selectFeature = (featureId: string) => {
    dispatch({ type: 'SELECT_FEATURE', payload: featureId });
  };

  const setSearchValue = (value: string) => {
    dispatch({ type: 'SET_SEARCH_VALUE', payload: value });
  };

  const toggleDropdown = () => {
    dispatch({ type: 'TOGGLE_DROPDOWN' });
  };

  const closeDropdown = () => {
    dispatch({ type: 'CLOSE_DROPDOWN' });
  };

  const setSearchFromRecent = (query: string) => {
    dispatch({ type: 'SET_SEARCH_FROM_RECENT', payload: query });
  };

  return (
    <AtlasContext.Provider value={{
      state,
      dispatch,
      selectFeature,
      setSearchValue,
      toggleDropdown,
      closeDropdown,
      setSearchFromRecent,
    }}>
      {children}
    </AtlasContext.Provider>
  );
};

// Hook
export const useAtlas = () => {
  const context = useContext(AtlasContext);
  if (context === undefined) {
    throw new Error('useAtlas must be used within an AtlasProvider');
  }
  return context;
};