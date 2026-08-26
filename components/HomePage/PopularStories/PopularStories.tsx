'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getPopularStories } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Button } from '@/components/ui/buttons/btn';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import LoaderComponent from '@/components/Loader/Loader';
import styles from './PopularStories.module.css';
import ErrorWhileSavingModal from '@/components/ui/ErrorWhileSavingModal/ErrorWhileSavingModal';
import StoryCard from '@/components/ui/StoryCard/StoryCard';
import {
  addSavedArticle,
  removeSavedArticle,
  getSavedStories,
} from '@/lib/api/storyApi';
import 'swiper/css';
import 'swiper/css/navigation';

const swiperOptions = {
  modules: [Navigation],
  navigation: {
    prevEl: '.popular-stories-prev',
    nextEl: '.popular-stories-next',
    disabledClass: styles.navDisabled,
  },
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 16,
  breakpoints: {
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 24,
    },
  },
} as SwiperOptions;

export default function PopularStories() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [savedOverrides, setSavedOverrides] = useState<Record<string, boolean>>(
    {},
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['popular-stories'],
    queryFn: () => getPopularStories(6),
  });

  const savedStoriesQuery = useQuery({
    queryKey: ['saved-stories'],
    queryFn: () => getSavedStories(1, 100),
    enabled: isAuthenticated,
  });

  const savedStoryIds = useMemo(() => {
    return new Set(
      savedStoriesQuery.data?.data.map((story) => story._id) ?? [],
    );
  }, [savedStoriesQuery.data]);

  useEffect(() => {
    if (isError) {
      const message =
        error instanceof Error
          ? error.message
          : 'Помилка при завантаженні популярних статей';

      toast.error(message);
    }
  }, [isError, error]);

  const isStorySaved = (storyId: string) =>
    savedOverrides[storyId] ?? savedStoryIds.has(storyId);

  const handleSave = async (storyId: string) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    const isSaved = isStorySaved(storyId);

    try {
      if (isSaved) {
        await removeSavedArticle(storyId);
      } else {
        await addSavedArticle(storyId);
      }

      setSavedOverrides((prev) => ({
        ...prev,
        [storyId]: !isSaved,
      }));

      await savedStoriesQuery.refetch();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Не вдалося зберегти статтю';

      toast.error(message);
    }
  };

  if (isLoading) return <LoaderComponent />;

  const stories = data?.data ?? [];

  if (!stories.length) return null;
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <PageTitle tag="h2" className={styles.title}>
            Популярні статті
          </PageTitle>

          <Button
            type="button"
            variant="primary"
            className={styles.desktopLink}
            onClick={() => router.push('/stories')}
          >
            Всі статті
          </Button>
        </div>

        <div className={styles.sliderWrap}>
          <Swiper {...swiperOptions} className={styles.slider}>
            {stories.map((story, index) => (
              <SwiperSlide key={story._id} className={styles.slide}>
                <StoryCard
                  story={story}
                  isPriority={index === 0}
                  isSaved={isStorySaved(story._id)}
                  onSave={handleSave}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.nav}>
            <Button
              type="button"
              variant="secondary"
              className={`${styles.navBtn} popular-stories-prev`}
              aria-label="Попередні статті"
            >
              ←
            </Button>

            <Button
              type="button"
              variant="secondary"
              className={`${styles.navBtn} popular-stories-next`}
              aria-label="Наступні статті"
            >
              →
            </Button>
          </div>

          <Button
            type="button"
            variant="primary"
            className={styles.mobileLink}
            onClick={() => router.push('/stories')}
          >
            Всі статті
          </Button>
        </div>
        {isAuthModalOpen && (
          <ErrorWhileSavingModal onClose={() => setIsAuthModalOpen(false)} />
        )}
      </div>
    </section>
  );
}
