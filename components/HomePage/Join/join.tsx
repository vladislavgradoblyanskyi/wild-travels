'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/useAuthStore';
import styles from './join.module.css';

export default function Join() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const linkHref = isAuthenticated ? '/auth/profile' : '/auth/register';
  const linkText = isAuthenticated ? 'Збережені статті' : 'Зареєструватися';

  return (
    <section className={styles.join} id="join">
      <div className={styles.container}>
        <h2 className={styles.title}>
          Приєднуйся до спільноти свідомих мандрівників
        </h2>

        <p className={styles.description}>
          Стань частиною ком&apos;юніті, де подорожі стають не лише пригодою, а
          й внеском у збереження природи. Тут ти знайдеш однодумців, поради для
          сталих мандрів та натхнення для нових маршрутів Україною.
        </p>

        <Link href={linkHref} className={styles.button}>
          {linkText}
        </Link>
      </div>
    </section>
  );
}
