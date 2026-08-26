'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import StoriesGrid from '@/components/StoriesPage/CategoriesFilter/StoriesGrid';
import { Pagination } from '@/components/ui/pagination/pagination';
import ErrorWhileSavingModal from '@/components/ui/ErrorWhileSavingModal/ErrorWhileSavingModal';

import { useAuthStore } from '@/lib/store/useAuthStore';
import { addSavedArticle, removeSavedArticle } from '@/lib/api/storyApi';

import type { Story, StoriesResponse } from '@/types/story';
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
  const queryClient = useQueryClient();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [showModal, setShowModal] = useState(false);

  const queryKey = useMemo(
    () => (ownerId ? ['stories', 'author', ownerId] : ['stories', 'all']),
    [ownerId],
  );

  const {
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<StoriesResponse>({
    queryKey,
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

  const savedStoryIds = useMemo(() => {
    return new Set(
      stories.filter((story) => story.isSaved).map((story) => story._id),
    );
  }, [stories]);

  const toggleSaveMutation = useMutation({
    mutationFn: async ({ id, isSaved }: { id: string; isSaved: boolean }) => {
      if (isSaved) {
        return removeSavedArticle(id);
      } else {
        return addSavedArticle(id);
      }
    },
    onMutate: async ({ id, isSaved }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData =
        queryClient.getQueryData<InfiniteData<StoriesResponse>>(queryKey);

      queryClient.setQueryData<InfiniteData<StoriesResponse>>(
        queryKey,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((story: Story) =>
                story._id === id
                  ? {
                      ...story,
                      isSaved: !isSaved,
                      savedCount: story.savedCount + (isSaved ? -1 : 1),
                    }
                  : story,
              ),
            })),
          };
        },
      );

      return { previousData };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      toast.error('Не вдалося змінити статус збереження');
    },
    onSuccess: (_, variables) => {
      toast.success(
        variables.isSaved
          ? 'Історію видалено зі збережених'
          : 'Історію збережено',
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleSave = (id: string) => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }

    const story = stories.find((s) => s._id === id);
    if (!story) return;

    toggleSaveMutation.mutate({ id, isSaved: !!story.isSaved });
  };

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

  return (
    <div className={styles.wrapper}>
      <div ref={topRef} />

      <StoriesGrid
        stories={stories}
        savedStoryIds={savedStoryIds}
        onSave={handleSave}
      />

      <Pagination
        isVisible={!!hasNextPage}
        isLoading={isFetchingNextPage}
        onClick={fetchNextPage}
        className={styles.pagination}
      />

      {showModal && (
        <ErrorWhileSavingModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
