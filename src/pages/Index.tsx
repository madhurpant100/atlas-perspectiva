import React from 'react';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import FeatureBar from '../components/FeatureBar';
import PlusDropdown from '../components/PlusDropdown';
import RecentQueries from '../components/RecentQueries';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <Header />
        
        {/* Search Input with Plus Button */}
        <div className="relative flex items-start gap-4 justify-center mb-6">
          <div className="flex-1 max-w-3xl">
            <SearchInput />
          </div>
          <div className="mt-2">
            <PlusDropdown />
          </div>
        </div>
        
        {/* Feature Bar */}
        <FeatureBar />
        
        {/* Recent Queries */}
        <RecentQueries />
      </div>
    </div>
  );
};

export default Index;