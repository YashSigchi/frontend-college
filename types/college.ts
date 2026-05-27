export interface Course {
  id: string;
  name: string;
  type: 'ug' | 'pg' | 'diploma' | 'phd';
  duration: string;
  fees: number;
  eligibility: string;
  seats: number;
}

export interface Placement {
  year: number;
  averagePackage: number;
  highestPackage: number;
  percentage: number;
  topRecruiters: string[];
}

export interface Review {
  id: string;
  studentName: string;
  batch: string;
  rating: number;
  comment: string;
  date: string;
  pros: string[];
  cons: string[];
}

export interface Facility {
  name: string;
  available: boolean;
  description?: string;
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  established: number;
  type: 'private' | 'public' | 'deemed';
  accreditation: string[];
  image: string;
  bannerImage: string;
  rating: number;
  totalReviews: number;
  fees: {
    min: number;
    max: number;
  };
  courses: Course[];
  placements: Placement[];
  facilities: Facility[];
  reviews: Review[];
  hostelAvailable: boolean;
  hostelFees?: number;
  campusSize: string;
  admissionProcess: string[];
  website: string;
  contact: {
    phone: string;
    email: string;
  };
}

export type SortOption = 'rating' | 'fees-low' | 'fees-high' | 'placements';

export interface Filters {
  location: string[];
  feesRange: [number, number];
  rating: number | null;
  courseType: string[];
}

export interface CompareState {
  selectedColleges: College[];
  maxColleges: number;
}
