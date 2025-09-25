import React, { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { format, subDays, startOfMonth } from 'date-fns';
import { useAtlas, DateRange } from '../context/AtlasContext';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '../lib/utils';

const DATE_PRESETS = [
  { id: 'today', label: 'Today', getValue: () => ({ from: new Date(), to: new Date() }) },
  { id: 'last7days', label: 'Last 7 days', getValue: () => ({ from: subDays(new Date(), 6), to: new Date() }) },
  { id: 'last30days', label: 'Last 30 days', getValue: () => ({ from: subDays(new Date(), 29), to: new Date() }) },
  { id: 'last60days', label: 'Last 60 days', getValue: () => ({ from: subDays(new Date(), 59), to: new Date() }) },
  { id: 'last90days', label: 'Last 90 days', getValue: () => ({ from: subDays(new Date(), 89), to: new Date() }) },
  { id: 'last1year', label: 'Last 1 year', getValue: () => ({ from: subDays(new Date(), 364), to: new Date() }) },
];

const DateFilter: React.FC = () => {
  const { state, setDatePreset, setCustomDateRange, addFilter, removeFilter } = useAtlas();
  const { selectedDatePreset, customDateRange } = state;
  const [showCustomRange, setShowCustomRange] = useState(false);

  const handlePresetClick = (presetId: string) => {
    const preset = DATE_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    
    // Clear custom range if preset is selected
    if (customDateRange.from || customDateRange.to) {
      setCustomDateRange({ from: undefined, to: undefined });
    }
    
    // Toggle preset selection
    if (selectedDatePreset === presetId) {
      setDatePreset('');
      // Remove date filter
      const existingFilter = state.appliedFilters.find(f => f.type === 'date');
      if (existingFilter) {
        removeFilter(existingFilter.id);
      }
    } else {
      setDatePreset(presetId);
      
      // Remove existing date filter first
      const existingFilter = state.appliedFilters.find(f => f.type === 'date');
      if (existingFilter) {
        removeFilter(existingFilter.id);
      }
      
      // Add new date filter
      const dateFilterId = `date-filter-${Date.now()}`;
      addFilter({
        id: dateFilterId,
        type: 'date',
        label: 'Timeframe',
        value: preset.label
      });
    }
  };

  const handleCustomRangeSelect = (range: DateRange) => {
    setCustomDateRange(range);
    
    if (range.from && range.to) {
      // Clear preset selection if custom range is selected
      if (selectedDatePreset) {
        setDatePreset('');
      }
      
      // Remove existing date filter first
      const existingFilter = state.appliedFilters.find(f => f.type === 'date');
      if (existingFilter) {
        removeFilter(existingFilter.id);
      }
      
      const dateFilterId = `date-filter-${Date.now()}`;
      const formattedRange = `${format(range.from, 'MMM d')} - ${format(range.to, 'MMM d, yyyy')}`;
      
      addFilter({
        id: dateFilterId,
        type: 'date',
        label: 'Timeframe',
        value: formattedRange
      });
      
      setShowCustomRange(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {DATE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handlePresetClick(preset.id)}
            className={cn(
              "px-4 py-2 rounded-pill text-sm font-medium transition-all duration-200",
              selectedDatePreset === preset.id
                ? "bg-primary text-primary-foreground shadow-active"
                : "bg-pill-background text-pill-text border border-border-subtle hover:bg-pill-hover"
            )}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <Popover open={showCustomRange} onOpenChange={setShowCustomRange}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-pill text-sm font-medium transition-all duration-200",
              customDateRange.from && customDateRange.to
                ? "bg-primary text-primary-foreground shadow-active"
                : "bg-surface-elevated text-pill-text border border-border-subtle hover:bg-surface-hover"
            )}
          >
            <CalendarIcon className="w-4 h-4" />
            {customDateRange.from && customDateRange.to
              ? `${format(customDateRange.from, 'MMM d')} - ${format(customDateRange.to, 'MMM d, yyyy')}`
              : 'Custom Range'
            }
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-surface-elevated border border-border" align="start">
          <Calendar
            mode="range"
            defaultMonth={customDateRange.from}
            selected={customDateRange}
            onSelect={handleCustomRangeSelect}
            numberOfMonths={2}
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateFilter;