import { Metadata } from 'next';
import TravellerPublicProfile from '@/components/TravellerPage/TravellerPublicProfile/TravellerPublicProfile';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import styles from './Page.module.css';

//  заглушка поки немає компонента для списку історій мандрівника
const TravellerStoriesList = ({ travellerId }: { travellerId: string }) => (
  <div className={styles.placeholderList}>
    Тут зʼявиться список історій мандрівника (ID: {travellerId})
  </div>
);

async function getTravellerData(travellerId: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/travellers/${travellerId}`,
      {
        next: { revalidate: 0 },
      },
    );
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const resolvedParams = params ? await params : {};
  const traveller = await getTravellerData(resolvedParams.travellerId);

  if (!traveller || !traveller.user) {
    return { title: 'Мандрівник не знайдений | Природні мандри' };
  }

  return {
    title: `Профіль мандрівника ${traveller.user.name} | Природні мандри`,
    description: `Переглядайте публічні статті та історії мандрівника ${traveller.user.name} на сайті Природні мандри.`,
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

  const data = await getTravellerData(travellerId);

  if (!data || !data.user) {
    return (
      <div className={styles.notFoundContainer}>Такий користувач відсутній</div>
    );
  }

  const { user, stories } = data;

  const hasStories = stories && stories.length > 0;

  return (
    <main className={`container ${styles.pageContainer}`}>
      <TravellerPublicProfile traveller={user} />

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
