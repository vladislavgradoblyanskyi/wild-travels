'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import StoriesGrid from '@/components/StoriesPage/CategoriesFilter/StoriesGrid';
import { Button } from '@/components/UI/buttons/btn';
import type { Story } from '@/types/story';
import type { StoriesResponse } from '@/types/story';
import styles from './TravellersStories.module.css';

type TravellersStoriesProps = {
  ownerId?: string;
  perPage?: number;
};

export default function TravellersStories({
  ownerId,
  perPage = 6,
}: TravellersStoriesProps) {
  const topRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<StoriesResponse>({
    queryKey: ownerId ? ['stories', 'author', ownerId] : ['stories', 'all'],
    queryFn: async ({ pageParam }) => {
      const url = ownerId
        ? `/api/travellers/${ownerId}/stories?page=${pageParam}&perPage=${perPage}`
        : `/api/stories?page=${pageParam}&perPage=${perPage}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Не вдалося завантажити історії');
      }
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const stories = useMemo(() => {
    const mergedStories = data?.pages.flatMap((page) => page.data) ?? [];
    const uniqueStories = new Map(
      mergedStories.map((story) => [story._id, story] as const),
    );
    return Array.from(uniqueStories.values()) as unknown as Story[];
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'Не вдалося завантажити історії');
    }
  }, [isError, error]);

  const handleLoadMore = async () => {
    await fetchNextPage();
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className={styles.wrapper}>
      <div ref={topRef} />

      <StoriesGrid
        stories={stories}
        savedStoryIds={new Set()}
        onSave={() => {}}
      />

      {hasNextPage && (
        <div className={styles.pagination}>
          <Button
            type="button"
            variant="primary"
            onClick={handleLoadMore}
            isLoading={isFetchingNextPage}
          >
            Показати ще
          </Button>
        </div>
      )}
    </div>
  );
}
