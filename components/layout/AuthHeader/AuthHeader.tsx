import Link from 'next/link';
import css from './authHeader.module.css';
import { Icon } from '@/components/UI/Icon/Icon';

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
            <Icon name="icon-eco" width={24} height={24} fill="#1b391b"></Icon>
            <span className={css.span}>Природні Мандри</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
