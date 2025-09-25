import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { useAtlas } from '../context/AtlasContext';
import DateFilter from './DateFilter';
import AddFiltersModal from './AddFiltersModal';

const FilterSection: React.FC = () => {
  const { dispatch } = useAtlas();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="bg-surface border border-border-subtle rounded-lg p-4 shadow-sm mb-5">
      <h3 className="text-base font-medium text-foreground flex items-center gap-2 pb-2 border-b border-border-subtle mb-3">
        <Filter className="w-4 h-4 text-muted-foreground" />
        Filters
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Date Range</h4>
          <DateFilter />
        </div>

        {/* Additional Filters */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Additional Filters</h4>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-3 py-2 bg-surface-elevated border border-border-subtle rounded-lg text-sm font-medium text-foreground hover:bg-surface-hover transition-all duration-200 w-full justify-center"
          >
            <Plus className="w-4 h-4" />
            Add Filter
          </button>
        </div>
      </div>

      <AddFiltersModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
    </div>
  );
};

export default FilterSection;