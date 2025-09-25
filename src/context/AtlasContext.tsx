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

export interface Filter {
  id: string;
  type: string;
  label: string;
  value?: string;
  values?: string[];
}

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface AtlasState {
  selectedFeature: string | null;
  searchValue: string;
  isDropdownOpen: boolean;
  recentQueries: string[];
  appliedFilters: Filter[];
  selectedDatePreset: string | null;
  customDateRange: DateRange;
}

// Action Types
type AtlasAction =
  | { type: 'SELECT_FEATURE'; payload: string }
  | { type: 'SET_SEARCH_VALUE'; payload: string }
  | { type: 'TOGGLE_DROPDOWN' }
  | { type: 'CLOSE_DROPDOWN' }
  | { type: 'SET_SEARCH_FROM_RECENT'; payload: string }
  | { type: 'ADD_FILTER'; payload: Filter }
  | { type: 'ADD_MULTI_FILTER'; payload: Filter }
  | { type: 'REMOVE_FILTER'; payload: string }
  | { type: 'CLEAR_ALL_FILTERS' }
  | { type: 'SET_DATE_PRESET'; payload: string }
  | { type: 'SET_CUSTOM_DATE_RANGE'; payload: DateRange };

// Initial State
const initialState: AtlasState = {
  selectedFeature: null,
  searchValue: '',
  isDropdownOpen: false,
  recentQueries: RECENT_QUERIES,
  appliedFilters: [],
  selectedDatePreset: null,
  customDateRange: { from: undefined, to: undefined },
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
    case 'ADD_FILTER':
      return { 
        ...state, 
        appliedFilters: [...state.appliedFilters, action.payload]
      };
    case 'ADD_MULTI_FILTER':
      // For multi-filters, check if we already have a filter of the same type
      const existingFilterIndex = state.appliedFilters.findIndex(
        filter => filter.label === action.payload.label
      );
      
      if (existingFilterIndex >= 0) {
        // Replace the existing filter
        const updatedFilters = [...state.appliedFilters];
        updatedFilters[existingFilterIndex] = action.payload;
        return {
          ...state,
          appliedFilters: updatedFilters
        };
      } else {
        // Add as a new filter
        return {
          ...state,
          appliedFilters: [...state.appliedFilters, action.payload]
        };
      }
    case 'REMOVE_FILTER':
      return { 
        ...state, 
        appliedFilters: state.appliedFilters.filter(filter => filter.id !== action.payload) 
      };
    case 'CLEAR_ALL_FILTERS':
      return { 
        ...state, 
        appliedFilters: [],
        selectedDatePreset: null,
        customDateRange: { from: undefined, to: undefined }
      };
    case 'SET_DATE_PRESET':
      return { 
        ...state, 
        selectedDatePreset: action.payload,
        customDateRange: { from: undefined, to: undefined }
      };
    case 'SET_CUSTOM_DATE_RANGE':
      return { 
        ...state, 
        customDateRange: action.payload,
        selectedDatePreset: null
      };
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
  addFilter: (filter: Filter) => void;
  addMultiFilter: (filter: Filter) => void;
  removeFilter: (filterId: string) => void;
  clearAllFilters: () => void;
  setDatePreset: (preset: string) => void;
  setCustomDateRange: (range: DateRange) => void;
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

  const addFilter = (filter: Filter) => {
    dispatch({ type: 'ADD_FILTER', payload: filter });
  };

  const addMultiFilter = (filter: Filter) => {
    dispatch({ type: 'ADD_MULTI_FILTER', payload: filter });
  };

  const removeFilter = (filterId: string) => {
    dispatch({ type: 'REMOVE_FILTER', payload: filterId });
  };

  const clearAllFilters = () => {
    dispatch({ type: 'CLEAR_ALL_FILTERS' });
  };

  const setDatePreset = (preset: string) => {
    dispatch({ type: 'SET_DATE_PRESET', payload: preset });
  };

  const setCustomDateRange = (range: DateRange) => {
    dispatch({ type: 'SET_CUSTOM_DATE_RANGE', payload: range });
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
      addFilter,
      addMultiFilter,
      removeFilter,
      clearAllFilters,
      setDatePreset,
      setCustomDateRange,
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