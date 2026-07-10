import Image from 'next/image';
import styles from './TravellerInfo.module.css';

interface TravellerData {
  name: string;
  avatarUrl: string;
  articlesAmount: number;
}

interface TravellerInfoProps {
  traveller: TravellerData;
}

export default function TravellerInfo({ traveller }: TravellerInfoProps) {
  return (
    <div className={styles.travellerInfo}>
      <div className={styles.avatarWrapper}>
        <Image
          src={
            traveller.avatarUrl ||
            'https://ac.goit.global/fullstack/react/default-avatar.jpg'
          }
          alt={`Аватар мандрівника ${traveller.name}`}
          fill
          sizes="(max-width: 768px) 80px, 100px"
          className={styles.avatar}
          priority
        />
      </div>
      <div className={styles.meta}>
        <h2 className={styles.name}>{traveller.name}</h2>
        <p className={styles.count}>Статей: {traveller.articlesAmount ?? 0}</p>
      </div>
    </div>
  );
}
