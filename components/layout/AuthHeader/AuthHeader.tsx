import Link from 'next/link';
import css from './authHeader.module.css';

export default function AuthHeader() {
  return (
    <header>
      <div className="container">
        <nav className={css.navigationHome}>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={css.homeLink}
          >
            <svg width="24" height="24" fill="#1b391b">
              <use href="/icons/icons.svg#icon-eco" />
            </svg>
            <span className={css.span}>Природні Мандри</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
