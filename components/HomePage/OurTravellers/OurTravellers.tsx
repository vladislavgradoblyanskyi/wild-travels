'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { getTravellers } from '@/lib/api/clientApi';
import type { Traveller } from '@/types/traveller';

import { Button } from '@/components/ui/buttons/btn';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import TravellerCard from '@/components/ui/TravellerCard/TravellerCard';
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
  const router = useRouter();
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

          <Button
            type="button"
            variant="primary"
            className={styles.desktopLink}
            onClick={() => router.push('/travellers')}
          >
            Всі мандрівники
          </Button>
        </div>

        <div className={styles.sliderWrap}>
          <Swiper {...swiperOptions} className={styles.slider}>
            {travellers.map((traveller: Traveller) => (
              <SwiperSlide key={traveller._id} className={styles.slide}>
                <TravellerCard traveller={traveller} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.nav}>
            <Button
              type="button"
              variant="secondary"
              className={`${styles.navBtn} our-travellers-prev`}
              aria-label="Попередні мандрівники"
            >
              ←
            </Button>

            <Button
              type="button"
              variant="secondary"
              className={`${styles.navBtn} our-travellers-next`}
              aria-label="Наступні мандрівники"
            >
              →
            </Button>
          </div>

          <Button
            type="button"
            variant="primary"
            className={styles.mobileLink}
            onClick={() => router.push('/travellers')}
          >
            Всі мандрівники
          </Button>
        </div>
      </div>
    </section>
  );
}