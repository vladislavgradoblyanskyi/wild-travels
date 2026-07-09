import Image from 'next/image';
import Link from 'next/link';

import PageTitle from '../PageTitle/PageTitle';

import css from './Hero.module.css';

import heroMobile from '@/public/Image/hero-mob.jpg';
import heroTablet from '@/public/Image/hero-tab.jpg';
import heroDesktop from '@/public/Image/hero-desk.jpg';

export default function Hero() {
  return (
    <section className={css.hero}>
      <div className={css.content}>
        <PageTitle>Відкрий Україну заново — еко-мандри для натхнення</PageTitle>

        <p className={css.description}>
          Подорожуй екологічно, відкривай заповідні місця, гори та річки
          України.
        </p>

        <Link href="#join" className={css.button}>
          Доєднатись до мандрів
        </Link>
      </div>

      <div className={css.imageWrapper}>
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet="
              /Image/hero-desk.jpg 1x,
              /Image/hero-desk@2x.jpg 2x
            "
          />

          <source
            media="(min-width: 768px)"
            srcSet="
              /Image/hero-tab.jpg 1x,
              /Image/hero-tab@2x.jpg 2x
            "
          />

          <source
            media="(min-width: 375px)"
            srcSet="
              /Image/hero-mob.jpg 1x,
              /Image/hero-mob@2x.jpg 2x
            "
          />

          <Image
            src={heroMobile}
            alt="Карпатські гори"
            priority
            className={css.image}
            width="100"
          />
        </picture>
      </div>
    </section>
  );
}
