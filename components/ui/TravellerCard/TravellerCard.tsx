'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/buttons/btn';
import type { Traveller } from '@/types/traveller';
import styles from './TravellerCard.module.css';

type Props = {
  traveller: Traveller;
};

export default function TravellerCard({ traveller }: Props) {
  const router = useRouter();

  return (
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
        <p className={styles.meta}>Статей: {traveller.articlesAmount}</p>
      </div>

      <Button
        type="button"
        variant="secondary"
        className={styles.profileBtn}
        onClick={() => router.push(`/travellers/${traveller._id}`)}
      >
        Переглянути профіль
      </Button>
    </article>
  );
}
