import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useAtlas } from '../context/AtlasContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';

const FILTER_OPTIONS = [
  { 
    id: 'region', 
    label: 'Region', 
    type: 'select', 
    values: ['North America', 'Europe', 'Asia Pacific', 'Latin America'] 
  },
  { 
    id: 'product', 
    label: 'Product', 
    type: 'select', 
    values: ['Accelerator', 'Enterprise', 'Starter', 'Professional'] 
  },
  { 
    id: 'status', 
    label: 'Status', 
    type: 'select', 
    values: ['Active', 'Inactive', 'Pending', 'Completed'] 
  },
  { 
    id: 'channel', 
    label: 'Channel', 
    type: 'select', 
    values: ['Direct', 'Partner', 'Online', 'Retail'] 
  },
];

interface AddFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddFiltersModal: React.FC<AddFiltersModalProps> = ({ isOpen, onClose }) => {
  const { addMultiFilter } = useAtlas();
  const [selectedFilters, setSelectedFilters] = useState<{[key: string]: string[]}>({});

  const handleFilterSelect = (optionId: string, value: string) => {
    setSelectedFilters(prev => {
      const currentValues = prev[optionId] || [];
      const valueExists = currentValues.includes(value);
      
      if (valueExists) {
        // Remove the value if it's already selected
        return {
          ...prev,
          [optionId]: currentValues.filter(v => v !== value)
        };
      } else {
        // Add the value if it's not selected
        return {
          ...prev,
          [optionId]: [...currentValues, value]
        };
      }
    });
  };

  const isValueSelected = (optionId: string, value: string) => {
    return (selectedFilters[optionId] || []).includes(value);
  };

  const handleApplyFilters = () => {
    // For each filter type that has selections
    Object.entries(selectedFilters).forEach(([optionId, values]) => {
      if (values.length > 0) {
        const option = FILTER_OPTIONS.find(opt => opt.id === optionId);
        if (option) {
          addMultiFilter({
            id: `${optionId}-${Date.now()}`,
            type: option.type,
            label: option.label,
            values: values
          });
        }
      }
    });
    
    // Reset selections and close modal
    setSelectedFilters({});
    onClose();
  };

  const handleCancel = () => {
    setSelectedFilters({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="bg-surface-elevated border border-border max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-foreground">
            Add Filters
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 py-6">
          {FILTER_OPTIONS.map((option) => (
            <div key={option.id} className="space-y-4">
              <h3 className="text-lg font-medium text-foreground border-b border-border-subtle pb-2">
                {option.label}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {option.values.map((value) => {
                  const isSelected = isValueSelected(option.id, value);
                  return (
                    <button
                      key={value}
                      onClick={() => handleFilterSelect(option.id, value)}
                      className={`px-4 py-3 text-left text-sm flex items-center justify-between rounded-lg transition-all duration-200 focus:outline-none ${
                        isSelected 
                          ? 'bg-primary/10 border-2 border-primary text-foreground' 
                          : 'bg-surface border border-border-subtle text-foreground hover:bg-surface-hover hover:border-border'
                      }`}
                    >
                      <span>{value}</span>
                      {isSelected && <Check size={16} className="text-primary" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="flex justify-end gap-3 pt-2 border-t border-border-subtle">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-md text-sm font-medium text-foreground bg-surface border border-border-subtle hover:bg-surface-hover transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 rounded-md text-sm font-medium text-primary-foreground bg-primary hover:bg-primary-hover transition-colors"
            disabled={Object.values(selectedFilters).every(values => values.length === 0)}
          >
            Apply Filters
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFiltersModal;