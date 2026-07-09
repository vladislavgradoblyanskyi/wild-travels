'use client';

import Image from 'next/image';
import { Button } from '../Buttons/Btn';
import { useRouter } from 'next/navigation';
import css from './TravellerCard.module.css';

interface TravellerCardProps {
  _id: number;
  avatarUrl: string;
  name: string;
  articlesAmount: number;
}

export default function TravellerCard(traveller: TravellerCardProps) {
  const router = useRouter();
  const handleViewProfile = () => {
    router.push(`/travellers/${traveller._id}`);
  };

  return (
    <div className={css.travellerCard}>
      <Image
        src={traveller.avatarUrl}
        alt={traveller.name}
        className={css.travellerAvatar}
        width={130}
        height={130}
        unoptimized
      />
      <h3 className={css.travellerName}>{traveller.name}</h3>
      <p className={css.travellerArticles}>
        Статей: {traveller.articlesAmount}
      </p>
      <Button className={css.travellerButton} onClick={handleViewProfile}>
        Переглянути профіль
      </Button>
    </div>
  );
}
