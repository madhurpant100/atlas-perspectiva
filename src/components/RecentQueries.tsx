import React from 'react';
import { Clock } from 'lucide-react';
import { useAtlas } from '../context/AtlasContext';

const RecentQueries: React.FC = () => {
  const { state, setSearchFromRecent } = useAtlas();

  const handleQueryClick = (query: string) => {
    setSearchFromRecent(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto atlas-animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center gap-2 mb-4">
        <Clock size={18} className="text-muted-foreground" />
        <h3 className="text-sm font-medium text-muted-foreground">Recent Queries</h3>
      </div>
      
      <div className="grid gap-3 md:grid-cols-1">
        {state.recentQueries.map((query, index) => (
          <button
            key={index}
            onClick={() => handleQueryClick(query)}
            className="atlas-card text-left group"
            aria-label={`Use recent query: ${query}`}
          >
            <p className="text-foreground font-medium group-hover:text-primary transition-colors duration-200">
              {query}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentQueries;