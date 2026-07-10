import Image from 'next/image';
import styles from './about.module.css';

import aboutImg from '@/public/Image/about-mob.webp';

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Мандруй екологічно та відкривай нові горизонти
          </h2>

          <p className={styles.description}>
            Наш проєкт створений для тих, хто хоче досліджувати Україну
            відповідально. Ми допоможемо знайти унікальні маршрути, які
            поєднують красу природи, локальну культуру та принципи сталого
            туризму.
          </p>

          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>
              <h3 className={styles.featureTitle}>Еко-маршрути по Україні</h3>
              <p className={styles.featureText}>
                Від Карпат до Чорного моря — добірка локацій, де можна
                подорожувати без шкоди для довкілля.
              </p>
            </li>
            <li className={styles.featureItem}>
              <h3 className={styles.featureTitle}>
                Практичні екологічні поради
              </h3>
              <p className={styles.featureText}>
                Дізнайся, як зменшити свій екологічний слід під час мандрів, та
                зробити подорож комфортною й свідомою.
              </p>
            </li>
          </ul>
        </div>

        <div className={styles.imageWrapper}>
          <picture>
            <source
              media="(min-width: 1440px)"
              srcSet="
              /Image/about-desk.webp 1x,
              /Image/about-desk@2x.webp 2x
            "
            />
            <source
              media="(min-width: 768px)"
              srcSet="
              /Image/about-tab.webp 1x,
              /Image/about-tab@2x.webp 2x
            "
            />
            <source
              media="(min-width: 375px)"
              srcSet="
              /Image/about-mob.webp 1x,
              /Image/about-mob@2x.webp 2x
            "
            />

            <Image
              src={aboutImg}
              alt="Густий зелений ліс під хмарами"
              className={styles.image}
              loading="lazy"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
