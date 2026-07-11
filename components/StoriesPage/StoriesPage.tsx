'use client';

import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import LoaderComponent from '@/components/Loader/Loader';
import MessageNoStories from '@/components/ui/MessageNoStories/MessageNoStories';
import StoriesCategories from './CategoriesFilter/StoriesCategories';
import StoriesGrid from './CategoriesFilter/StoriesGrid';
import { getCategories, getStories } from '@/lib/api/storyApi';
import { useAuthStore } from '@/lib/store/useAuthStore';
import type { StoriesResponse } from '@/types/story';
import styles from './StoriesPage.module.css';

const STORIES_PER_PAGE = 9;

export default function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState('');
  const [savedStoryIds, setSavedStoryIds] = useState<Set<string>>(new Set());
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const categoriesQuery = useQuery({
    queryKey: ['story-categories'],
    queryFn: getCategories,
  });

  const storiesQuery = useInfiniteQuery<StoriesResponse>({
    queryKey: ['stories', activeCategory],
    queryFn: ({ pageParam }) =>
      getStories({
        pageParam: pageParam as number,
        perPage: STORIES_PER_PAGE,
        category: activeCategory || undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const stories = useMemo(() => {
    const mergedStories =
      storiesQuery.data?.pages.flatMap((page) => page.data) ?? [];
    const uniqueStories = new Map(
      mergedStories.map((story) => [story._id, story] as const),
    );

    return Array.from(uniqueStories.values());
  }, [storiesQuery.data]);

  useEffect(() => {
    if (storiesQuery.isError) {
      toast.error(
        storiesQuery.error.message || 'Не вдалося завантажити історії',
      );
    }
  }, [storiesQuery.error, storiesQuery.isError]);

  useEffect(() => {
    if (categoriesQuery.isError) {
      toast.error(
        categoriesQuery.error.message || 'Не вдалося завантажити категорії',
      );
    }
  }, [categoriesQuery.error, categoriesQuery.isError]);

  const handleSave = (storyId: string) => {
    if (!isAuthenticated) {
      toast.error('Увійдіть, щоб зберігати історії');
      return;
    }

    setSavedStoryIds((prev) => {
      const next = new Set(prev);

      if (next.has(storyId)) {
        next.delete(storyId);
        toast.success('Історію прибрано зі збережених');
      } else {
        next.add(storyId);
        toast.success('Історію додано до збережених');
      }

      return next;
    });
  };

  const isInitialLoading = storiesQuery.isLoading || categoriesQuery.isLoading;

  if (isInitialLoading) {
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.loader}>
            <LoaderComponent />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.hero}>
          <PageTitle>Статті</PageTitle>
        </div>

        <StoriesCategories
          categories={categoriesQuery.data?.data ?? []}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <div className={styles.results}>
          {stories.length ? (
            <>
              <StoriesGrid
                stories={stories}
                savedStoryIds={savedStoryIds}
                onSave={handleSave}
              />

              {storiesQuery.hasNextPage ? (
                <div className={styles.pagination}>
                  <button
                    type="button"
                    className={styles.loadMoreButton}
                    onClick={() => storiesQuery.fetchNextPage()}
                    disabled={storiesQuery.isFetchingNextPage}
                  >
                    {storiesQuery.isFetchingNextPage
                      ? 'Завантаження...'
                      : 'Показати ще'}
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <MessageNoStories
              text="За цим фільтром історій поки немає. Спробуйте іншу категорію."
              buttonText="Показати всі історії"
              onAction={() => setActiveCategory('')}
            />
          )}
        </div>
      </div>
    </section>
  );
}
