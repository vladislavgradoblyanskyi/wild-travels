import Image from 'next/image';
import css from './TravellerPublicProfile.module.css';

interface TravellerData {
  name: string;
  avatarUrl: string;
  articlesAmount: number;
}

interface TravellerPublicProfileProps {
  traveller: TravellerData;
}

export default function TravellerPublicProfile({
  traveller,
}: TravellerPublicProfileProps) {
  return (
    <>
      <div className={css.container}>
        <div className={css.travellerInfo}>
          <div className={css.avatarWrapper}>
            <Image
            width={145}
            height={145}
              src={
                traveller.avatarUrl ||
                'https://ac.goit.global/fullstack/react/default-avatar.jpg'
              }
              alt={`Аватар мандрівника ${traveller.name}`}
              className={css.avatar}
              priority
              unoptimized
            />
          </div>
          <div className={css.meta}>
            <h2 className={css.name}>{traveller.name}</h2>
            <p className={css.count}>Статей: {traveller.articlesAmount ?? 0}</p>
          </div>
        </div>
      </div>
    </>
  );
}
