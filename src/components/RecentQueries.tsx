import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { useAtlas } from '../context/AtlasContext';

const RecentQueries: React.FC = () => {
  const { state, setSearchFromRecent } = useAtlas();
  const { recentQueries } = state;

  if (recentQueries.length === 0) return null;

  return (
    <div className="bg-surface border border-border-subtle rounded-lg p-4 shadow-sm">
      <h3 className="text-base font-medium text-foreground flex items-center gap-2 pb-2 border-b border-border-subtle mb-3">
        <Clock className="w-4 h-4 text-muted-foreground" />
        Recent Queries
      </h3>
      
      <div className="space-y-3">
        {recentQueries.map((query, index) => (
          <button
            key={index}
            onClick={() => setSearchFromRecent(query)}
            className="w-full text-left p-3 bg-surface-elevated hover:bg-surface-hover border border-border-subtle rounded-lg transition-all duration-200 group flex items-center justify-between"
          >
            <span className="text-sm text-foreground line-clamp-1">{query}</span>
            <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentQueries;