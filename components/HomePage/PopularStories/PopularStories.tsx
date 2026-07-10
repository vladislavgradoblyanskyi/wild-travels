'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { getPopularStories, saveStory, unsaveStory } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/useAuthStore';
import StoryCard from '@/components/ui/StoryCard/StoryCard';

import { Button } from '@/components/ui/buttons/btn';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import LoaderComponent from '@/components/Loader/Loader';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './PopularStories.module.css';

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
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [savedOverrides, setSavedOverrides] = useState<
    Record<string, boolean>
  >({});

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['popular-stories'],
    queryFn: () => getPopularStories(6),
  });

  useEffect(() => {
    if (isError) {
      const message =
        error instanceof Error
          ? error.message
          : 'Помилка при завантаженні популярних статей';

      toast.error(message);
    }
  }, [isError, error]);

  const isStorySaved = (storyId: string, defaultSaved: boolean) =>
    savedOverrides[storyId] ?? defaultSaved;

  const handleSave = async (storyId: string) => {
    if (!isAuthenticated) {
      toast.error('Увійдіть, щоб зберігати статті');
      return;
    }

    const story = data?.data.find((item) => item._id === storyId);
    const isSaved = isStorySaved(storyId, story?.isSaved ?? false);

    try {
      if (isSaved) {
        await unsaveStory(storyId);
      } else {
        await saveStory(storyId);
      }

      setSavedOverrides((prev) => ({ ...prev, [storyId]: !isSaved }));
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
                  isSaved={isStorySaved(story._id, story.isSaved)}
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
      </div>
    </section>
  );
}
