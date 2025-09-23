import React from 'react';
import { X } from 'lucide-react';
import { useAtlas } from '../context/AtlasContext';

const AppliedFilters: React.FC = () => {
  const { state, removeFilter, clearAllFilters } = useAtlas();
  const { appliedFilters } = state;

  if (appliedFilters.length === 0) return null;

  return (
    <div className="bg-surface border border-border-subtle rounded-2xl p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-foreground">Applied Filters</h3>
        <button
          onClick={clearAllFilters}
          className="text-xs text-primary hover:text-primary-hover transition-colors"
        >
          Clear all
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {appliedFilters.map((filter) => (
          <div
            key={filter.id}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-pill-background border border-border-subtle rounded-pill text-sm text-pill-text"
          >
            <span className="font-medium text-primary">{filter.label}:</span>
            <span>{filter.value}</span>
            <button
              onClick={() => removeFilter(filter.id)}
              className="ml-1 p-0.5 hover:bg-surface-hover rounded-full transition-colors"
              aria-label={`Remove ${filter.label} filter`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedFilters;