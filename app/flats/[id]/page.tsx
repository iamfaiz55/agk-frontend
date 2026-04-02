
import { flatsData } from '@/data/mockData';
import FlatDetailsClient from './FlatDetailsClient';

export function generateStaticParams() {
  return flatsData.map((flat) => ({
    id: flat.id,
  }));
}

export default function FlatDetailsPage() {
  return <FlatDetailsClient />;
}
