import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { useAtlas } from '../context/AtlasContext';
import DateFilter from './DateFilter';
import AddFiltersModal from './AddFiltersModal';

const FilterSection: React.FC = () => {
  const { state } = useAtlas();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Date Filter Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-foreground">Date Range</h3>
        </div>
        <DateFilter />
      </div>

      {/* Additional Filters */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-foreground">Additional Filters</h3>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface-elevated border border-border-subtle rounded-pill text-sm font-medium text-foreground hover:bg-surface-hover transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Filter
        </button>
      </div>

      <AddFiltersModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
    </div>
  );
};

export default FilterSection;