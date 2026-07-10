import { SkeletonCard } from '@/components/UI/Skeleton/Skeleton';
import style from './TravellersList.module.css';
import css from '@/components/UI/TravellerCard/TravellerCard.module.css';

export const TravellersListSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className={style.travellersList}>
      <div>
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonCard key={index} className={css.travellerCard} />
        ))}
      </div>
    </div>
  );
};
