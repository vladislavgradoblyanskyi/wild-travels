'use client';

import { CustomLink } from '@/components/ui/Link/Link';
import { useAuthStore } from '@/lib/store/useAuthStore';
import styles from './join.module.css';

export default function Join() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const linkHref = isAuthenticated ? '/profile' : '/register';
  const linkText = isAuthenticated ? 'Збережені статті' : 'Зареєструватися';

  return (
    <section className={styles.join} id="join">
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Приєднуйся до спільноти свідомих мандрівників
          </h2>

          <p className={styles.description}>
            Стань частиною ком&apos;юніті, де подорожі стають не лише пригодою,
            а й внеском у збереження природи. Тут ти знайдеш однодумців, поради
            для сталих мандрів та натхнення для нових маршрутів Україною.
          </p>

          <CustomLink href={linkHref} className={styles.button}>
            {linkText}
          </CustomLink>
        </div>
      </div>
    </section>
  );
}
