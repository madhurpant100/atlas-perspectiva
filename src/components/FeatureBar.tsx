import React from 'react';
import { useAtlas } from '../context/AtlasContext';
import { BarChart3, LineChart, PieChart } from 'lucide-react';

const FeatureBar: React.FC = () => {
  const { state, selectFeature } = useAtlas();
  const { selectedFeature } = state;

  const features = [
    { id: 'bar', name: 'Bar Chart', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'line', name: 'Line Chart', icon: <LineChart className="w-5 h-5" /> },
    { id: 'pie', name: 'Pie Chart', icon: <PieChart className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {features.map((feature) => (
        <button
          key={feature.id}
          onClick={() => selectFeature(feature.id)}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
            selectedFeature === feature.id
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-surface-elevated text-foreground border-border-subtle hover:bg-surface-hover'
          }`}
        >
          {feature.icon}
          <span className="font-medium">{feature.name}</span>
        </button>
      ))}
    </div>
  );
};

export default FeatureBar;