import { Metadata } from 'next';
import css from './NotFound.module.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  openGraph: {
    title: 'Page Not Found',
    description:
      'The page you are looking for does not exist or has been moved.',
    url: 'https://wild-travels.com/not-found',
    siteName: 'wild-travels',
  },
  twitter: {
    title: 'Page Not Found',
    description:
      'The page you are looking for does not exist or has been moved.',
  },
};

export default function NotFound() {
  return (
    <div className="container">
      <div className={css.wrapper}>
        <h1 className={css.title}>404 - Сторінку не знайдено</h1>

        <p className={css.description}>
          На жаль, сторінка, яку ви шукаєте, не існує або її було переміщено.
        </p>
        <Link className={css.link} href="/">
          Повернутися на головну
        </Link>
      </div>
    </div>
  );
}
