'use client';

import { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import StoryCard from '@/components/ui/StoryCard/StoryCard';
import { CustomLink } from '@/components/ui/Link/Link';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './PopularStories.module.css';

type Story = {
  _id: string;
  img: string;
  title: string;
  article?: string;
  savedCount?: number;
  rate: number;
  date?: string;
  ownerId?: {
    _id?: string;
    name?: string;
  } | string;
};

type StoriesResponse = {
  data: Story[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

export default function PopularStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stories?type=popular&page=1&perPage=10`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch stories');
        }

        const json: StoriesResponse = await res.json();

        const normalizedStories = (json.data ?? []).map(story => ({
          ...story,
          ownerId:
            typeof story.ownerId === 'object' && story.ownerId?.name
              ? story.ownerId
              : { name: 'Автор' },
        }));

        setStories(normalizedStories);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <h2 className={styles.title}>Популярні статті</h2>

            <CustomLink href="/stories" variant="button" className={styles.allLink}>
              Всі статті
            </CustomLink>
          </div>

          <div className={styles.message}>Завантаження...</div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <h2 className={styles.title}>Популярні статті</h2>

            <CustomLink href="/stories" variant="button" className={styles.allLink}>
              Всі статті
            </CustomLink>
          </div>

          <div className={styles.message}>Не вдалося завантажити статті.</div>
        </div>
      </section>
    );
  }

  if (!stories.length) {
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <h2 className={styles.title}>Популярні статті</h2>

            <CustomLink href="/stories" variant="button" className={styles.allLink}>
              Всі статті
            </CustomLink>
          </div>

          <div className={styles.message}>Популярних статей поки немає.</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Популярні статті</h2>

          <CustomLink href="/stories" variant="button" className={styles.allLink}>
            Всі статті
          </CustomLink>
        </div>

        <div className={styles.sliderWrap}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.popular-stories-prev',
              nextEl: '.popular-stories-next',
              disabledClass: styles.navDisabled,
            }}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={16}
            breakpoints={{
              768: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 24,
              },
            }}
          >
            {stories.map((story, index) => (
              <SwiperSlide key={story._id} className={styles.slide}>
                <div className={styles.cardWrap}>
                  <StoryCard
                    story={story}
                    isSaved={false}
                    isPriority={index < 3}
                    onOpen={(id: string) => console.log('open', id)}
                    onSave={(id: string) => console.log('save', id)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.controlsRow}>
          <div className={styles.nav}>
            <button
              type="button"
              className={`${styles.navBtn} popular-stories-prev`}
              aria-label="Попередні статті"
            >
              ←
            </button>

            <button
              type="button"
              className={`${styles.navBtn} popular-stories-next`}
              aria-label="Наступні статті"
            >
              →
            </button>
          </div>

          <CustomLink href="/stories" variant="button" className={styles.allLinkMobile}>
            Всі статті
          </CustomLink>
        </div>
      </div>
    </section>
  );
}