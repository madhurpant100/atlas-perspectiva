import React, { useEffect, useRef } from 'react';
import { useAtlas } from '../context/AtlasContext';
import { FEATURES } from '../context/AtlasContext';

const FeatureBar: React.FC = () => {
  const { state, selectFeature } = useAtlas();
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      
      const pills = containerRef.current.querySelectorAll('.atlas-pill') as NodeListOf<HTMLElement>;
      const currentIndex = Array.from(pills).findIndex(pill => pill === document.activeElement);
      
      let nextIndex = -1;
      
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = currentIndex < pills.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = currentIndex > 0 ? currentIndex - 1 : pills.length - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (currentIndex >= 0) {
            const feature = FEATURES[currentIndex];
            selectFeature(feature.id);
          }
          break;
      }
      
      if (nextIndex >= 0) {
        pills[nextIndex].focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectFeature]);

  return (
    <div 
      ref={containerRef}
      className="flex flex-wrap justify-center gap-3 mb-8 atlas-animate-slide-up"
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
          <span>{feature.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FeatureBar;