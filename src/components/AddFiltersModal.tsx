import React from 'react';
import { X } from 'lucide-react';
import { useAtlas } from '../context/AtlasContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

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
  const { addFilter } = useAtlas();

  const handleFilterSelect = (option: any, value: string) => {
    const filterId = `${option.id}-${Date.now()}`;
    addFilter({
      id: filterId,
      type: option.type,
      label: option.label,
      value: value
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-surface-elevated border border-border max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Add Filters
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {FILTER_OPTIONS.map((option) => (
            <div key={option.id} className="space-y-3">
              <h3 className="text-sm font-medium text-foreground border-b border-border-subtle pb-2">
                {option.label}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {option.values.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleFilterSelect(option, value)}
                    className="px-4 py-3 text-left text-sm text-foreground bg-surface border border-border-subtle rounded-lg hover:bg-surface-hover hover:border-border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-elevated"
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFiltersModal;