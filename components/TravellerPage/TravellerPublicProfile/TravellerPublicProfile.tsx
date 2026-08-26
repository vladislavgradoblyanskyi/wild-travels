'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import css from './TravellerPublicProfile.module.css';
import { updateAvatar } from '@/lib/api/clientApi';

interface TravellerData {
  name: string;
  avatarUrl: string;
  articlesAmount: number;
}

interface TravellerPublicProfileProps {
  traveller: TravellerData;
  totalArticles: number;
}

export default function TravellerPublicProfile({
  traveller,
  totalArticles,
}: TravellerPublicProfileProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [avatar, setAvatar] = useState(traveller.avatarUrl);

  const handleAvatarClick = () => {
    inputRef.current?.click();
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append(
      'avatarUrl',
      file,
    );

    try {
      const response = await updateAvatar(formData);

      setAvatar(response.url);

    } catch (error) {
      console.error(
        'Avatar update error:',
        error,
      );

    } finally {
      event.target.value = '';
    }
  };

  return (
    <div className={css.container}>
      <div className={css.travellerInfo}>
        <div
          className={css.avatarWrapper}
          onClick={handleAvatarClick}
        >
          <Image
            width={145}
            height={145}
            src={
              avatar ||
              'https://ac.goit.global/fullstack/react/default-avatar.jpg'
            }
            alt={`Аватар мандрівника ${traveller.name}`}
            className={css.avatar}
            priority
            unoptimized
          />

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleAvatarChange}
          />
        </div>

        <div className={css.meta}>
          <h2 className={css.name}>
            {traveller.name}
          </h2>

          <p className={css.count}>
            Статей: {totalArticles}
          </p>
        </div>
      </div>
    </div>
  );
}