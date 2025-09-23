import React from 'react';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import FeatureBar from '../components/FeatureBar';
import PlusDropdown from '../components/PlusDropdown';
import AppliedFilters from '../components/AppliedFilters';
import FilterSection from '../components/FilterSection';
import RecentQueries from '../components/RecentQueries';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <Header />
        
        {/* Search Input with Plus Button */}
        <div className="flex flex-col lg:flex-row items-start gap-4 justify-center mb-8">
          <div className="flex-1 w-full max-w-4xl">
            <SearchInput />
          </div>
          <div className="shrink-0">
            <PlusDropdown />
          </div>
        </div>
        
        {/* Feature Bar */}
        <div className="mb-8">
          <FeatureBar />
        </div>
        
        {/* Applied Filters */}
        <div className="mb-6">
          <AppliedFilters />
        </div>
        
        {/* Filter Section */}
        <div className="mb-8">
          <FilterSection />
        </div>
        
        {/* Recent Queries */}
        <RecentQueries />
      </div>
    </div>
  );
};

export default Index;