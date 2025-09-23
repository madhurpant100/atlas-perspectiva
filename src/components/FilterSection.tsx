import React, { useRef, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import { useAtlas } from '../context/AtlasContext';
import DateFilter from './DateFilter';

const FILTER_OPTIONS = [
  { id: 'region', label: 'Region', type: 'select', values: ['North America', 'Europe', 'Asia Pacific', 'Latin America'] },
  { id: 'product', label: 'Product', type: 'select', values: ['Accelerator', 'Enterprise', 'Starter', 'Professional'] },
  { id: 'status', label: 'Status', type: 'select', values: ['Active', 'Inactive', 'Pending', 'Completed'] },
  { id: 'channel', label: 'Channel', type: 'select', values: ['Direct', 'Partner', 'Online', 'Retail'] },
];

const FilterSection: React.FC = () => {
  const { state, addFilter, toggleFilterDropdown, closeFilterDropdown } = useAtlas();
  const { isFilterDropdownOpen } = state;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeFilterDropdown();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeFilterDropdown();
      }
    };

    if (isFilterDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isFilterDropdownOpen, closeFilterDropdown]);

  const handleFilterSelect = (option: any, value: string) => {
    const filterId = `${option.id}-${Date.now()}`;
    addFilter({
      id: filterId,
      type: option.type,
      label: option.label,
      value: value
    });
  };

  return (
    <div className="mb-8">
      {/* Date Filter Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-foreground">Date Range</h3>
        </div>
        <DateFilter />
      </div>

      {/* Additional Filters */}
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-medium text-foreground">Additional Filters</h3>
      </div>
      
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleFilterDropdown}
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface-elevated border border-border-subtle rounded-pill text-sm font-medium text-foreground hover:bg-surface-hover transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Filter
        </button>

        {isFilterDropdownOpen && (
          <div className="atlas-dropdown">
            <div className="py-1">
              {FILTER_OPTIONS.map((option) => (
                <div key={option.id} className="px-3 py-2">
                  <div className="text-xs font-medium text-muted-foreground mb-2">
                    {option.label}
                  </div>
                  <div className="space-y-1">
                    {option.values.map((value) => (
                      <button
                        key={value}
                        onClick={() => handleFilterSelect(option, value)}
                        className="block w-full text-left px-2 py-1.5 text-sm text-foreground hover:bg-surface-hover rounded-md transition-colors"
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;