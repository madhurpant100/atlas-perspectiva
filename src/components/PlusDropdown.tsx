import React, { useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useAtlas } from '../context/AtlasContext';
import { OVERFLOW_FEATURES } from '../context/AtlasContext';

const PlusDropdown: React.FC = () => {
  const { state, selectFeature, toggleDropdown, closeDropdown } = useAtlas();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown on click outside or escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDropdown();
        buttonRef.current?.focus();
      }
    };

    if (state.isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [state.isDropdownOpen, closeDropdown]);

  // Focus management for dropdown
  useEffect(() => {
    if (state.isDropdownOpen && dropdownRef.current) {
      const firstPill = dropdownRef.current.querySelector('.atlas-pill') as HTMLElement;
      firstPill?.focus();
    }
  }, [state.isDropdownOpen]);

  const handleFeatureSelect = (featureId: string) => {
    selectFeature(featureId);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="atlas-plus-button"
        aria-label="More features"
        aria-expanded={state.isDropdownOpen}
        aria-haspopup="true"
      >
        <Plus size={20} className={`transition-transform duration-200 ${
          state.isDropdownOpen ? 'rotate-45' : ''
        }`} />
      </button>

      {state.isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="atlas-dropdown"
          role="menu"
          aria-label="Additional features"
        >
          {OVERFLOW_FEATURES.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => handleFeatureSelect(feature.id)}
              className={`atlas-pill w-full justify-start mb-1 last:mb-0 ${
                state.selectedFeature === feature.id ? 'atlas-pill-active' : ''
              }`}
              role="menuitem"
              tabIndex={index === 0 ? 0 : -1}
              aria-pressed={state.selectedFeature === feature.id}
            >
              <span className="atlas-pill-icon" role="img" aria-hidden="true">
                {feature.icon}
              </span>
              <span>{feature.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlusDropdown;