import React from 'react';
import { useAtlas } from '../context/AtlasContext';
import { FEATURES } from '../context/AtlasContext';

const FeatureBar: React.FC = () => {
  const { state, selectFeature } = useAtlas();

  return (
    <div 
      className="flex flex-wrap justify-center gap-2 sm:gap-3 atlas-animate-slide-up"
      style={{ animationDelay: '0.2s' }}
      role="toolbar"
      aria-label="Analytics features"
    >
      {FEATURES.map((feature, index) => (
        <button
          key={feature.id}
          onClick={() => selectFeature(feature.id)}
          className={`atlas-pill ${
            state.selectedFeature === feature.id ? 'atlas-pill-active' : ''
          }`}
          tabIndex={index === 0 ? 0 : -1}
          role="button"
          aria-pressed={state.selectedFeature === feature.id}
          aria-label={`${feature.label} feature`}
        >
          <span className="atlas-pill-icon" role="img" aria-hidden="true">
            {feature.icon}
          </span>
          <span className="hidden sm:inline">{feature.label}</span>
          <span className="sm:hidden text-xs">{feature.label.split(' ')[0]}</span>
        </button>
      ))}
    </div>
  );
};

export default FeatureBar;