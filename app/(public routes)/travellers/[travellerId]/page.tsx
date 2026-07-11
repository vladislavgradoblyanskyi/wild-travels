'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';


import TravellerInfo from '@/components/ui/TravellerInfo/TravellerInfo';
import MessageNoStories from '../../../../components/ui/MessageNoStories/MessageNoStories';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import TravellersStories from '@/components/ui/TravellersStories/TravellersStories';

import LoaderComponent from '@/components/Loader/Loader';

import type { Story } from '@/types/story';
import type { Traveller } from '@/types/traveller';
import styles from './Page.module.css';

export default function TravelerPage() {
  const params = useParams();
  const travellerId = Array.isArray(params?.travellerId)
    ? params.travellerId[0]
    : (params?.travellerId as string | undefined);

  const [user, setUser] = useState<Traveller | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTravellerData() {
      if (!travellerId) return;

      try {
        const res = await fetch(`/api/travellers/${travellerId}`);
        if (!res.ok) throw new Error();

        const data = await res.json();

        setUser(data.user);

        const enrichedStories =
          data.stories?.map((story: Story) => ({
            ...story,
            ownerId: {
              _id: String(data.user._id),
              name: data.user.name,
              avatarUrl: data.user.avatarUrl,
            },
            author: {
              name: data.user.name,
            },
          })) || [];

        setStories(enrichedStories as Story[]);
      } catch {
        setUser(null);
        setStories([]);
      } finally {
        setLoading(false);
      }
    }

    loadTravellerData();
  }, [travellerId]);

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <LoaderComponent />
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.notFoundContainer}>Такий користувач відсутній</div>
    );
  }

  const hasStories = stories.length > 0;

  return (
    <main className={`container ${styles.pageContainer}`}>
      <TravellerInfo traveller={user} />

      <PageTitle tag="h2" className={styles.title}>
        Статті Мандрівника
      </PageTitle>

      {hasStories ? (
        <TravellersStories ownerId={travellerId} perPage={6} />
      ) : (
        <MessageNoStories
          text="Цей користувач ще не публікував історій"
          buttonText="Назад до історій"
          linkTo="/stories"
        />
      )}
    </main>
  );
}
