import React from 'react';
import { X } from 'lucide-react';
import { useAtlas } from '../context/AtlasContext';

const AppliedFilters: React.FC = () => {
  const { state, removeFilter, clearAllFilters } = useAtlas();
  const { appliedFilters } = state;

  if (appliedFilters.length === 0) return null;

  return (
    <div className="bg-surface border border-border-subtle rounded-2xl p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-sm font-medium text-foreground">
          Applied Filters ({appliedFilters.length})
        </h3>
        <button
          onClick={clearAllFilters}
          className="text-xs text-primary hover:text-primary-hover transition-colors self-start sm:self-auto"
        >
          Clear all
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {appliedFilters.map((filter) => (
          <div
            key={filter.id}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-pill-background border border-border-subtle rounded-pill text-sm text-pill-text max-w-full"
          >
            <span className="font-medium text-primary shrink-0">{filter.label}:</span>
            <span className="truncate">{filter.value}</span>
            <button
              onClick={() => removeFilter(filter.id)}
              className="ml-1 p-0.5 hover:bg-surface-hover rounded-full transition-colors shrink-0"
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