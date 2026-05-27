# College Discovery Platform

A production-quality MVP for discovering, comparing, and exploring colleges in India. Built with Next.js 14, React, TypeScript, and TailwindCSS.

## Features

### Core Features

1. **College Listing with Search & Filters**
   - Debounced search functionality
   - Filter by location, fees range, rating, and course type
   - Sort by rating, fees, or placements
   - Pagination support
   - Responsive grid layout with loading skeletons

2. **College Detail Page**
   - Comprehensive overview with stats
   - Course listings with fees and eligibility
   - Placement statistics with trends
   - Fee structure breakdown
   - Facilities information
   - Admission process steps
   - Student reviews
   - Sticky tabs for easy navigation

3. **Compare Colleges**
   - Compare up to 3 colleges side-by-side
   - Highlighted best values (highest rating, lowest fees, highest package)
   - Responsive comparison table
   - Mobile-friendly stacked layout

### Technical Features

- **TypeScript** - Full type safety throughout the codebase
- **Reusable Components** - Modular architecture with shared components
- **State Management** - Context API for compare feature
- **Responsive Design** - Mobile-first approach with desktop enhancements
- **Error Boundaries** - Graceful error handling
- **Loading States** - Skeleton loaders for better UX
- **Empty States** - Informative fallback UIs
- **Clean Architecture** - Scalable and maintainable folder structure

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Context API

## Project Structure

```
├── app/
│   ├── page.tsx                    # Main college listing page
│   ├── colleges/[id]/page.tsx      # College detail page
│   ├── compare/page.tsx            # College comparison page
│   ├── layout.tsx                  # Root layout with providers
│   ├── not-found.tsx               # 404 page
│   └── globals.css                  # Global styles
│
├── components/
│   ├── college/                    # College-specific components
│   │   ├── CollegeCard.tsx
│   │   ├── FilterSidebar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SortDropdown.tsx
│   │   ├── Pagination.tsx
│   │   └── sections/               # College detail sections
│   │       ├── OverviewSection.tsx
│   │       ├── CoursesSection.tsx
│   │       ├── PlacementsSection.tsx
│   │       ├── FeesSection.tsx
│   │       ├── FacilitiesSection.tsx
│   │       ├── AdmissionSection.tsx
│   │       └── ReviewsSection.tsx
│   │
│   ├── compare/                    # Comparison components
│   │   └── CompareTable.tsx
│   │
│   ├── layout/                     # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ErrorBoundary.tsx
│   │
│   └── shared/                     # Reusable shared components
│       ├── RatingBadge.tsx
│       ├── EmptyState.tsx
│       ├── LoadingSkeleton.tsx
│       └── SectionHeader.tsx
│
├── data/
│   └── colleges.ts                  # Mock college data (20 colleges)
│
├── lib/
│   └── CompareContext.tsx           # Comparison state management
│
└── types/
    └── college.ts                   # TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd college-discovery-platform
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Key Features Explained

### Search & Filtering

- **Debounced Search**: 300ms debounce to prevent excessive filtering
- **Multi-filter Support**: Combine multiple filters simultaneously
- **Range Slider**: Interactive fees range filter
- **Real-time Updates**: Instant results as you filter

### Comparison System

- **Context-based State**: Global compare state managed via React Context
- **Maximum 3 Colleges**: Prevents information overload
- **Persistent Selection**: Selected colleges persist across navigation
- **Visual Highlights**: Best values highlighted in the comparison table

### Responsive Design

- **Mobile-First**: Optimized for mobile viewing
- **Adaptive Filters**: Collapsible filter sheet on mobile
- **Stacked Comparison**: Mobile-friendly stacked layout for comparison
- **Flexible Grids**: Responsive card grids that adjust to screen size

### Performance Optimizations

- **Component Memoization**: Optimized re-renders where applicable
- **Lazy Loading**: Images loaded with Next.js Image component
- **Code Splitting**: Automatic route-based code splitting
- **Efficient Filtering**: Optimized filter and sort algorithms

## Edge Cases Handled

- Invalid college ID routes
- Missing data fields
- Empty search/filter results
- Network/loading states
- Maximum comparison limit reached
- React hydration warnings
- TypeScript strict mode compliance

## Mock Data

The platform includes 20 realistic Indian colleges with comprehensive data:
- IIT Delhi, IIT Bombay, IIT Madras, IIT Kanpur
- NIT Trichy, NITK Surathkal
- BITS Pilani, IIIT Hyderabad
- VIT Vellore, Manipal University
- And more...

Each college includes:
- Basic info (name, location, established year)
- Fees range and course-wise fees
- Multiple courses with eligibility
- Placement statistics and trends
- Facilities information
- Student reviews
- Accreditation details

## Future Enhancements

Potential improvements if expanding the MVP:
- Dark mode toggle
- Bookmark/save colleges feature
- Recent searches
- Toast notifications
- Advanced filters (accreditation, college type)
- College ranking system
- User reviews submission
- College recommendations

## License

MIT License

## Author

Built as an AI Software Engineer Internship Assignment
