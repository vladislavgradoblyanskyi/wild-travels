'use client';

import css from './TravellersList.module.css';

import { useEffect, useRef } from 'react';
import TravellerCard from '@/components/ui/TravellerCard/TravellerCard';
import { Pagination } from '@/components/ui/pagination/pagination';
import { TravellersListSkeleton } from './TravellersListSkeleton';
import { getTravellers } from '@/lib/api/clientApi';
import type { Traveller, TravellersResponse } from '@/types/traveller';
import { useInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export default function TravellersList() {
  const lastElementRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    error,
  } = useInfiniteQuery<TravellersResponse>({
    queryKey: ['travellers'],
    queryFn: ({ pageParam }) => getTravellers(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  useEffect(() => {
    if (!isFetchingNextPage && data?.pages && data.pages.length > 1) {
      lastElementRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [data, isFetchingNextPage]);
  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'Помилка при завантаженні мандрівників');
    }
  }, [isError, error]);

  if (isLoading) return <TravellersListSkeleton count={12} />;

  return (
    <>
      <div className={css.travellersList}>
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex} ref={pageIndex > 0 ? lastElementRef : null}>
            {page.users.map((traveller: Traveller) => (
  <TravellerCard
    key={traveller._id}
    traveller={traveller}
  />
))}
          </div>
        ))}
      </div>
      <div className={css.paginationContainer}>
        <Pagination
          onClick={() => fetchNextPage()}
          isVisible={!!hasNextPage}
          isLoading={isFetchingNextPage}
        />
      </div>
    </>
  );
}
