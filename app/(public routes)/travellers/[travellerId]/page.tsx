import { Metadata } from 'next';
import TravellerPublicProfile from '@/components/TravellerPage/TravellerPublicProfile/TravellerPublicProfile';
import TravellerStoriesList from '@/components/TravellerPage/TravellerStoriesList/TravellerStoriesList';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import styles from './Page.module.css';

async function getTravellerData(travellerId: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${travellerId}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const resolvedParams = params ? await params : {};
  const traveller = await getTravellerData(resolvedParams.travellerId);

  if (!traveller) {
    return {
      title: 'Мандрівник не знайдений | Природні мандри',
    };
  }

  return {
    title: `Профіль мандрівника ${traveller.name} | Природні мандри`,
    description: `Переглядайте публічні статті та історії мандрівника ${traveller.name} на сайті Природні мандри.`,
    openGraph: {
      title: `Профіль мандрівника ${traveller.name} | Природні мандри`,
      description: `Усі історії та блоги користувача ${traveller.name}.`,
      images: [
        {
          url:
            traveller.avatarUrl ||
            'https://ac.goit.global/fullstack/react/default-avatar.jpg',
          width: 800,
          height: 600,
          alt: traveller.name,
        },
      ],
      type: 'profile',
    },
  };
}

export default async function TravelerPage(props: any) {
  const resolvedParams = props.params ? await props.params : {};
  const travellerId = resolvedParams.travellerId;

  if (!travellerId) {
    return (
      <div className={styles.notFoundContainer}>Такий користувач відсутній</div>
    );
  }

  const traveller = await getTravellerData(travellerId);

  if (!traveller) {
    return (
      <div className={styles.notFoundContainer}>Такий користувач відсутній</div>
    );
  }

  const hasStories = traveller.articlesAmount > 0;

  return (
    <main className={`container ${styles.pageContainer}`}>
      <TravellerPublicProfile traveller={traveller} />

      <h3 className={styles.title}>Статті Мандрівника</h3>

      {hasStories ? (
        <TravellerStoriesList travellerId={travellerId} />
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
