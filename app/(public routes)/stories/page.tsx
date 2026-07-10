import type { Metadata } from 'next';
import StoriesPage from '@/components/StoriesPage/StoriesPage';

export const metadata: Metadata = {
  title: 'Історії',
  description:
    'Читайте історії мандрівників, фільтруйте їх за категоріями та відкривайте нові природні маршрути.',
};

export default function Page() {
  return <StoriesPage />;
}
