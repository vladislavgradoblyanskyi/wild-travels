'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Grid, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { getTravellers } from '@/lib/api/clientApi';
import type { Traveller } from '@/types/traveller';

import { CustomLink } from '@/components/UI/Link/Link';
import { PageTitle } from '@/components/UI/PageTitle/PageTitle';
import LoaderComponent from '@/components/Loader/Loader';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';

import styles from './OurTravellers.module.css';

const swiperOptions = {
  modules: [Grid, Navigation],
  navigation: {
    prevEl: '.our-travellers-prev',
    nextEl: '.our-travellers-next',
    disabledClass: styles.navDisabled,
  },
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 16,
  grid: {
    rows: 3,
    fill: 'row' as const,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
      grid: {
        rows: 2,
        fill: 'row' as const,
      },
    },
    1440: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 24,
      grid: {
        rows: 1,
        fill: 'row' as const,
      },
    },
  },
} as SwiperOptions;

export default function OurTravellers() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['our-travellers'],
    queryFn: () => getTravellers(1),
  });

  useEffect(() => {
    if (isError) {
      const message =
        error instanceof Error
          ? error.message
          : 'Помилка при завантаженні мандрівників';

      toast.error(message);
    }
  }, [isError, error]);

  if (isLoading) return <LoaderComponent />;

  const travellers = data?.users ?? [];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <PageTitle tag="h2" className={styles.title}>
            Наші Мандрівники
          </PageTitle>

          <CustomLink
            href="/travellers"
            variant="button"
            className={styles.desktopLink}
          >
            Всі мандрівники
          </CustomLink>
        </div>

        <div className={styles.sliderWrap}>
          <Swiper {...swiperOptions} className={styles.slider}>
            {travellers.map((traveller: Traveller) => (
              <SwiperSlide key={traveller._id} className={styles.slide}>
                <article className={styles.card}>
                  <div className={styles.avatarWrap}>
                    <Image
                      src={traveller.avatarUrl}
                      alt={traveller.name}
                      fill
                      unoptimized
                      className={styles.avatar}
                    />
                  </div>

                  <div className={styles.textBlock}>
                  <h3 className={styles.cardTitle}>{traveller.name}</h3>
                  <p className={styles.meta}>
                    Статей: {traveller.articlesAmount}
                  </p>
                  </div>

                  <CustomLink
                    href={`/travellers/${traveller._id}`}
                    variant="secondary"
                    className={styles.profileLink}
                  >
                    Переглянути профіль
                  </CustomLink>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.nav}>
            <button
              type="button"
              className={`${styles.navBtn} our-travellers-prev`}
              aria-label="Попередні мандрівники"
            >
              ←
            </button>

            <button
              type="button"
              className={`${styles.navBtn} our-travellers-next`}
              aria-label="Наступні мандрівники"
            >
              →
            </button>
          </div>

          <CustomLink
            href="/travellers"
            variant="button"
            className={styles.mobileLink}
          >
            Всі мандрівники
          </CustomLink>
        </div>
      </div>
    </section>
  );
}