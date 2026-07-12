'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import StoriesGrid from '@/components/StoriesPage/CategoriesFilter/StoriesGrid';
import { Pagination } from '@/components/ui/pagination/pagination';
import type { Story } from '@/types/story';
import type { StoriesResponse } from '@/types/story';
import styles from './TravellersStories.module.css';

export default function TravellersStories({
  ownerId,
  perPage = 6,
}: {
  ownerId?: string;
  perPage?: number;
}) {
  const topRef = useRef<HTMLDivElement>(null);
  const prevStoriesLengthRef = useRef(0);

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
    if (
      stories.length > prevStoriesLengthRef.current &&
      prevStoriesLengthRef.current > 0
    ) {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    prevStoriesLengthRef.current = stories.length;
  }, [stories.length]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'Не вдалося завантажити історії');
    }
  }, [isError, error]);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <div className={styles.wrapper}>
      <div ref={topRef} />

      <StoriesGrid
        stories={stories}
        savedStoryIds={new Set()}
        onSave={() => {}}
      />

      <Pagination
        isVisible={!!hasNextPage}
        isLoading={isFetchingNextPage}
        onClick={handleLoadMore}
        className={styles.pagination}
      />
    </div>
  );
}
