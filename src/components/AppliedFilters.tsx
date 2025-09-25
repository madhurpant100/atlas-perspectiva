import React from 'react';
import { X } from 'lucide-react';
import { useAtlas } from '../context/AtlasContext';

const AppliedFilters: React.FC = () => {
  const { state, removeFilter, clearAllFilters } = useAtlas();
  const { appliedFilters } = state;

  if (appliedFilters.length === 0) return null;

  return (
    <div className="bg-surface border border-border-subtle rounded-lg p-3 text-sm shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="font-medium text-foreground">
          Applied Filters ({appliedFilters.length})
        </h3>
        <button
          onClick={clearAllFilters}
          className="text-primary hover:text-primary-hover transition-colors text-sm font-medium"
        >
          Clear all
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {appliedFilters.map((filter) => (
          <div
            key={filter.id}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pill-background border border-border-subtle rounded-lg text-pill-text max-w-full"
          >
            <span className="font-medium text-primary shrink-0">{filter.label}:</span>
            {filter.values ? (
              <span className="truncate">
                {filter.values.join(', ')}
              </span>
            ) : (
              <span className="truncate">{filter.value}</span>
            )}
            <button
              onClick={() => removeFilter(filter.id)}
              className="ml-1 hover:bg-surface-hover rounded-full p-0.5 transition-colors shrink-0"
              aria-label={`Remove ${filter.label} filter`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedFilters;