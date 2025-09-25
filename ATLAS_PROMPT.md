# Atlas - Advanced Analytics UI Prompt

Build a fully interactive React.js analytics dashboard application called "Atlas" inspired by Perplexity and ChatGPT Plus interfaces. This should be a responsive, accessible, and state-managed application with a modern dark theme design system.

## Tech Stack Requirements
- **Framework**: React 18+ with TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React Context + useReducer
- **Icons**: Lucide React
- **UI Components**: Shadcn/ui components
- **Router**: React Router DOM
- **Date Handling**: date-fns + react-day-picker

## Application Structure

### Core Layout
```
src/
├── App.tsx                     # Main app with providers and routing
├── pages/
│   ├── Index.tsx              # Main dashboard page
│   └── NotFound.tsx           # 404 page
├── components/
│   ├── Header.tsx             # App title and subtitle
│   ├── SearchInput.tsx        # Main search input with send icon
│   ├── FeatureBar.tsx         # Horizontal feature pills
│   ├── PlusDropdown.tsx       # Plus button with overflow features
│   ├── AppliedFilters.tsx     # Display active filters
│   ├── FilterSection.tsx      # Left sidebar filters container
│   ├── DateFilter.tsx         # Date presets and custom range picker
│   ├── AddFiltersModal.tsx    # Modal for adding additional filters
│   ├── RecentQueries.tsx      # Recent queries section
│   └── ui/                    # Shadcn UI components
├── context/
│   └── AtlasContext.tsx       # Global state management
├── hooks/
├── lib/
│   └── utils.ts              # Utility functions
└── index.css                 # Global styles and design tokens
```

## Design System

### Color Scheme (Dark Theme)
Use HSL color values in CSS custom properties:

```css
:root {
  /* Backgrounds */
  --background: 222 84% 5%;           /* Very dark blue-gray */
  --surface: 217 33% 8%;              /* Slightly lighter surface */
  --surface-elevated: 217 33% 10%;    /* Elevated surfaces */
  --surface-hover: 217 33% 12%;       /* Hover states */
  
  /* Text */
  --foreground: 213 31% 91%;          /* Primary text */
  --muted-foreground: 215 20.2% 65.1%; /* Secondary text */
  
  /* Primary Brand */
  --primary: 263 70% 64%;             /* Purple/blue primary */
  --primary-foreground: 210 20% 98%;  /* Text on primary */
  --primary-hover: 263 70% 58%;       /* Primary hover */
  
  /* Borders */
  --border: 217 33% 15%;              /* Default borders */
  --border-subtle: 217 33% 12%;       /* Subtle borders */
  
  /* Interactive Elements */
  --pill-background: 217 33% 10%;     /* Filter pills */
  --pill-text: 213 31% 91%;          /* Pill text */
  
  /* Semantic Colors */
  --destructive: 0 84% 60%;           /* Red for delete actions */
  --muted: 217 33% 8%;               /* Muted backgrounds */
}
```

### Typography & Spacing
- **Font**: System font stack with antialiasing
- **Borders**: Custom radius values (--radius-sm: 6px, --radius: 8px, --radius-lg: 12px)
- **Shadows**: Subtle box shadows for depth
- **Transitions**: 200ms ease-out for all interactions

## State Management Structure

### AtlasContext.tsx
```typescript
// Feature Data
export const FEATURES = [
  { id: 'labs', label: 'Labs', icon: '🧪' },
  { id: 'deep', label: 'Deep Analysis', icon: '🔍' },
  { id: 'insights', label: 'Advanced Insights', icon: '⚡' },
  { id: 'compare', label: 'Smart Compare', icon: '📊' },
  { id: 'timeline', label: 'Timeline Mode', icon: '⏳' },
];

export const OVERFLOW_FEATURES = [
  { id: 'export', label: 'Export', icon: '⬇️' },
  { id: 'humanize', label: 'Humanize Data', icon: '🤖' },
  { id: 'trends', label: 'Trend Analysis', icon: '📈' },
  { id: 'segments', label: 'Segmentation', icon: '🎯' },
];

export const RECENT_QUERIES = [
  "Show me conversion rates by opportunity type",
  "What are the top objections from partners?",
  "Compare performance across regions"
];

// State Structure
interface AtlasState {
  selectedFeature: string | null;        // Currently selected feature
  searchValue: string;                   // Search input value
  isDropdownOpen: boolean;               // Plus dropdown state
  recentQueries: string[];               // Recent search queries
  appliedFilters: Filter[];              // Active filters
  selectedDatePreset: string | null;     // Date preset selection
  customDateRange: DateRange;            // Custom date range
}

interface Filter {
  id: string;
  type: string;
  label: string;
  value?: string;        // Single value filters
  values?: string[];     // Multi-value filters
}

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}
```

## Core Features & Behavior

### 1. Header Component
- **Title**: "Atlas" with gradient text effect
- **Subtitle**: "AI-powered conversation analytics"
- **Styling**: Centered, prominent typography

### 2. Search Input
- **Layout**: Large input field with search/send icon on right
- **State**: Controlled input connected to context
- **Styling**: Rounded, prominent with focus states
- **Functionality**: Updates searchValue in context

### 3. Feature Bar (Pills)
- **Layout**: Horizontal row of 3-5 feature pills below search
- **Behavior**: 
  - Single selection (clicking selected pill deselects it)
  - Immediate visual feedback on selection
  - Hover effects with subtle scaling/shadow
- **Styling**: Pill-shaped buttons with icons and labels
- **Accessibility**: Keyboard navigation (tab/arrow keys)

### 4. Plus Dropdown
- **Position**: To the left of search input
- **Behavior**: 
  - Click to open dropdown with overflow features
  - Select feature from dropdown (same selection logic as main pills)
  - Click outside or Escape to close
- **Styling**: Consistent with main feature pills

### 5. Applied Filters Section
- **Display**: Horizontal row of active filter chips
- **Features**:
  - Individual remove buttons (X icon)
  - "Clear all" option
  - Shows filter count
- **Styling**: Chip-style design with subtle backgrounds

### 6. Filter Section (Left Sidebar)
- **Date Filter**:
  - Preset buttons: "Today", "Last 7 Days", "Last 30 Days", "This Month"
  - Custom range option with calendar picker (react-day-picker)
  - Only one date filter active at a time
- **Additional Filters**:
  - "Add Filter" button opens modal
  - Modal contains categorized filter options:
    - Region: North America, Europe, Asia Pacific, Latin America
    - Product: Accelerator, Enterprise, Starter, Professional
    - Status: Active, Inactive, Pending, Completed
    - Channel: Direct, Partner, Online, Retail

### 7. Add Filters Modal
- **Trigger**: "Add Filter" button in FilterSection
- **UI**: Full-screen modal (not dropdown)
- **Content**: 
  - Grid layout of filter categories
  - Multi-select checkboxes for each category
  - Visual feedback for selections
  - Apply/Cancel buttons
- **Behavior**: 
  - Support multiple selections per category
  - Replace existing filters of same type
  - Close on apply or cancel

### 8. Recent Queries Section
- **Layout**: Right side of main content area
- **Content**: 2-3 recent query cards
- **Behavior**: Clicking a query fills search input
- **Styling**: Clean card design with hover effects

## Responsive Design
- **Desktop**: Full layout with sidebar
- **Mobile**: Stack layout, collapsible sections
- **Breakpoints**: Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:)

## Accessibility Requirements
- **Keyboard Navigation**: All interactive elements focusable
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Semantic HTML**: Proper heading hierarchy and landmarks

## Animation & Interactions
- **Transitions**: 200ms ease-out for all state changes
- **Hover Effects**: Subtle scale/shadow changes
- **Selection States**: Immediate visual feedback
- **Loading States**: Skeleton placeholders where appropriate

## Custom CSS Classes
Create utility classes in index.css:
```css
.atlas-pill {
  /* Pill button styling with hover and active states */
}

.atlas-pill-active {
  /* Active/selected pill styling */
}

.atlas-dropdown {
  /* Dropdown container positioning and styling */
}

.atlas-input {
  /* Search input styling */
}

.atlas-card {
  /* Card component styling */
}
```

## Implementation Notes

### State Management
- Use React Context with useReducer for global state
- All UI changes should be driven by state updates
- No direct DOM manipulation or uncontrolled components

### Component Architecture
- Small, focused components
- Props interface for each component
- TypeScript for type safety
- Consistent naming conventions

### Performance
- Memoize expensive computations
- Use React.memo for components that don't need frequent re-renders
- Debounce search input if needed

### Error Handling
- Graceful fallbacks for missing data
- Error boundaries for component failures
- Console warnings for development

## File-by-File Implementation Guide

### tailwind.config.ts
- Extend theme with custom colors using CSS variables
- Add custom animations and transitions
- Configure responsive breakpoints

### index.css
- Define CSS custom properties for colors
- Create utility classes for common patterns
- Set up base styles and typography

### App.tsx
- Set up providers (AtlasProvider, QueryClient, Router)
- Configure routing
- Add global UI components (Toaster, Tooltip)

### pages/Index.tsx
- Main layout structure
- Component composition
- Responsive grid layout

### Each Component File
- TypeScript interfaces for props
- Proper hook usage (useAtlas, useEffect, etc.)
- Consistent styling with design tokens
- Accessibility attributes
- Error handling

## Testing Requirements
- All interactive elements should work with keyboard
- State changes should be immediate and visible
- Modal/dropdown behaviors should be consistent
- Responsive design should work on all screen sizes
- No console errors or warnings

## Final Deliverable
A complete, production-ready React application that demonstrates modern frontend development practices with:
- Clean, maintainable code architecture
- Comprehensive TypeScript typing
- Responsive, accessible design
- Smooth, professional interactions
- State-driven UI updates
- Modern design system implementation

The final result should feel like a professional analytics dashboard that could be used in a real business environment, with the polish and interactivity of modern SaaS applications.