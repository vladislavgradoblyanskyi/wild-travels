import Link from 'next/link';
import css from '@/app/NotFound.module.css';

export default function StoryNotFound() {
  return (
    <div className="container">
      <div className={css.wrapper}>
        <h1 className={css.title}>404 - Статтю не знайдено</h1>

        <p className={css.description}>
          На жаль, статті, яку ви шукаєте, не існує або її було видалено.
        </p>
        <Link className={css.link} href="/stories">
          Повернутися до статей
        </Link>
      </div>
    </div>
  );
}
