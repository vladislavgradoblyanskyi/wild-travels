'use client';
import { usePathname, useRouter } from 'next/navigation';
import css from './ProfileTabs.module.css';

export default function ProfileTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const isMyStoriesActive = pathname.includes('/profile/my');
  const isSavedStoriesActive = !isMyStoriesActive;

  return (
    <div className={css.container}>
      <div className={css.profiletabs}>
        <button type="button" className={`${css.tabButton} ${isSavedStoriesActive ? css.active : ''}`}
          onClick={() => router.push('/profile')}>
          Збережені історії
        </button>

        <button type="button" className={`${css.tabButton} ${isMyStoriesActive ? css.active : ''}`}
          onClick={() => router.push('/profile/my')}>
          Мої історії
        </button>
        </div>
    </div>
  );
}