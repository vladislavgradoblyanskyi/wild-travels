import Image from 'next/image';
import Link from 'next/link';

import PageTitle from '../PageTitle/PageTitle';

import styles from './hero.module.css';

import heroImg from '@/public/Image/hero-mob.webp';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <PageTitle>Відкрий Україну заново — еко-мандри для натхнення</PageTitle>

        <p className={styles.description}>
          Подорожуй екологічно, відкривай заповідні місця, гори та річки
          України.
        </p>

        <Link href="#join" className={styles.button}>
          Доєднатись до мандрів
        </Link>
      </div>

      <div className={styles.imageWrapper}>
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet="
              /Image/hero-desk.webp 1x,
              /Image/hero-desk@2x.webp 2x
            "
          />

          <source
            media="(min-width: 768px)"
            srcSet="
              /Image/hero-tab.webp 1x,
              /Image/hero-tab@2x.webp 2x
            "
          />

          <source
            media="(min-width: 375px)"
            srcSet="
              /Image/hero-mob.webp 1x,
              /Image/hero-mob@2x.webp 2x
            "
          />

          <Image
            src={heroImg}
            alt="Карпатські гори"
            priority
            className={styles.image}
          />
        </picture>
      </div>
    </section>
  );
}
