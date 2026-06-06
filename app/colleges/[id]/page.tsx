import { colleges } from '@/data/colleges';
import CollegeDetailClient from './CollegeDetailClient';

// This runs on the server at build time to define the static routes
export async function generateStaticParams() {
  return colleges.map((college) => ({
    id: college.id.toString(),
  }));
}

export default function CollegeDetailPage() {
  return <CollegeDetailClient />;
}