# College Discovery Platform

A production-ready MVP for discovering, comparing, and exploring Indian colleges.

## Features

### College Listing

* Search colleges with debounced input
* Filter by location, fees, rating, and course type
* Sort by rating, fees, and placements
* Pagination support
* Responsive grid layout

### College Details

* College overview and key statistics
* Courses, fees, and eligibility criteria
* Placement insights and trends
* Facilities and admission process
* Student reviews
* Sticky navigation tabs

### College Comparison

* Compare up to 3 colleges
* Side-by-side comparison table
* Highlights best rating, lowest fees, and highest package
* Mobile-responsive layout

## Tech Stack

* **Next.js 14 (App Router)**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Lucide React**
* **React Context API**

## Project Structure

```bash
app/
├── page.tsx
├── colleges/[id]/page.tsx
├── compare/page.tsx
└── layout.tsx

components/
├── college/
├── compare/
├── layout/
└── shared/

data/
├── colleges.ts

lib/
├── CompareContext.tsx

types/
├── college.ts
```

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Key Highlights

* Type-safe codebase with TypeScript
* Reusable and modular component architecture
* Responsive design across devices
* Loading, error, and empty state handling
* Context-based comparison state management
* Optimized search, filtering, and sorting

## Mock Data

Includes 20+ Indian colleges with:

* College information
* Courses and fees
* Placement statistics
* Facilities
* Reviews
* Accreditation details

## Future Improvements

* Dark mode
* Saved colleges
* Advanced filters
* College recommendations
* User-generated reviews

---

**Assignment Submission – AI Software Engineer Internship**
