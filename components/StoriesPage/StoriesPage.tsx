'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  addSavedArticle,
  getCategories,
  getSavedStories,
  getStories,
  removeSavedArticle,
} from '@/lib/api/storyApi';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import LoaderComponent from '@/components/Loader/Loader';
import MessageNoStories from '@/components/ui/MessageNoStories/MessageNoStories';
import StoriesCategories from './CategoriesFilter/StoriesCategories';
import { useAuthStore } from '@/lib/store/useAuthStore';
import type { StoriesResponse } from '@/types/story';
import styles from './StoriesPage.module.css';
import StoriesGrid from './CategoriesFilter/StoriesGrid';
import ErrorWhileSavingModal from '../ui/ErrorWhileSavingModal/ErrorWhileSavingModal';

const STORIES_PER_PAGE = 9;

export default function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const queryClient = useQueryClient();

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

  const savedStoriesQuery = useQuery({
    queryKey: ['saved-stories'],
    queryFn: () => getSavedStories(1, 100),
    enabled: isAuthenticated,
  });

  const saveStoryMutation = useMutation({
    mutationFn: addSavedArticle,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['saved-stories'],
      });

      queryClient.invalidateQueries({
        queryKey: ['stories'],
      });
    },
  });

  const removeStoryMutation = useMutation({
    mutationFn: removeSavedArticle,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['saved-stories'],
      });

      queryClient.invalidateQueries({
        queryKey: ['stories'],
      });
    },
  });

  const savedStoryIds = useMemo<Set<string>>(() => {
    return new Set(
      savedStoriesQuery.data?.data.map((story) => story._id) ?? [],
    );
  }, [savedStoriesQuery.data]);

  const stories = useMemo(() => {
    const mergedStories =
      storiesQuery.data?.pages.flatMap((page) => page.data) ?? [];
    const uniqueStories = new Map(
      mergedStories.map((story) => [story._id, story] as const),
    );

    return Array.from(uniqueStories.values());
  }, [storiesQuery.data]);

  useEffect(() => {
    console.log('Pages:', storiesQuery.data?.pages.length);

    storiesQuery.data?.pages.forEach((page) => {
      console.log(`Page ${page.page}:`, page.data.length, 'stories');
    });

    console.log(
      'Merged:',
      storiesQuery.data?.pages.flatMap((p) => p.data).length,
    );

    console.log('Rendered:', stories.length);

    console.log('Backend totalItems:', storiesQuery.data?.pages[0]?.totalItems);
  }, [storiesQuery.data, stories]);

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

  const handleSave = async (storyId: string) => {
    if (!isAuthenticated) {
      setIsErrorModalOpen(true);
      return;
    }

    try {
      if (savedStoryIds.has(storyId)) {
        await removeStoryMutation.mutateAsync(storyId);
        toast.success('Історію прибрано зі збережених');
      } else {
        await saveStoryMutation.mutateAsync(storyId);
        toast.success('Історію додано до збережених');
      }
    } catch {
      toast.error('Не вдалося оновити збережені історії');
    }
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
        {isErrorModalOpen && (
          <ErrorWhileSavingModal onClose={() => setIsErrorModalOpen(false)} />
        )}
      </div>
    </section>
  );
}
