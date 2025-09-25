import React from 'react';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import FeatureBar from '../components/FeatureBar';
import PlusDropdown from '../components/PlusDropdown';
import AppliedFilters from '../components/AppliedFilters';
import FilterSection from '../components/FilterSection';
import RecentQueries from '../components/RecentQueries';
import AddFiltersModal from '../components/AddFiltersModal';
import { useAtlas } from '../context/AtlasContext';

const Index: React.FC = () => {
  const { state } = useAtlas();
  const { isDropdownOpen } = state;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-8 py-10 max-w-7xl">
        {/* Header */}
        <Header />
        
        {/* Search Input with Plus Button */}
        <div className="flex items-center gap-3 mt-10 mb-8">
          <div className="flex-shrink-0">
            <PlusDropdown />
          </div>
          <div className="flex-1">
            <SearchInput />
          </div>
        </div>
        
        {/* Feature Bar */}
        <FeatureBar />
        
        {/* Applied Filters */}
        <AppliedFilters />
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* Filter Section - Left Side */}
          <div className="lg:col-span-1">
            <FilterSection />
          </div>
          
          {/* Recent Queries - Right Side */}
          <div className="lg:col-span-2">
            <RecentQueries />
          </div>
        </div>
        
        {isDropdownOpen && <AddFiltersModal />}
      </div>
    </div>
  );
};

export default Index;