'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

import css from './footer.module.css';
import { Icon } from '@/components/ui/Icon/Icon';


export default function Footer() {
  const pathname = usePathname();

  const isAuthPage =
    pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return (
      <footer className={css.footerAuth}>
        <div className={`container ${css.footerContainerAuth}`}>
          <p className={clsx(css.copyright, css.authCopyright)}>
            © {new Date().getFullYear()} Природні Мандри. Усі права захищені.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className={css.footer}>
      <div className={`container ${css.footerContainer}`}>
        <div className={css.top}>
          <div className={css.mainRow}>
            <Link href="/" className={css.logo}>
              <Icon name="icon-eco" className={css.logoIcon} />

              <span className={css.logoText}>
                <span>Природні</span>
                <span>Мандри</span>
              </span>
            </Link>

            <ul className={css.socials}>
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className={css.socialLink}
                >
                  <Icon name="icon-Facebook" className={css.socialIcon} />
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={css.socialLink}
                >
                  <Icon name="icon-Instagram" className={css.socialIcon} />
                </a>
              </li>

              <li>
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className={css.socialLink}
                >
                  <Icon name="icon-X" className={css.socialIcon} />
                </a>
              </li>

              <li>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className={css.socialLink}
                >
                  <Icon name="icon-Youtube" className={css.socialIcon} />
                </a>
              </li>
            </ul>
          </div>

          <nav className={css.nav}>
            <Link href="/">Головна</Link>
            <Link href="/stories">Статті</Link>
            <Link href="/travellers">Еко-Мандрівники</Link>
          </nav>
        </div>

        <p className={css.copyright}>
          © {new Date().getFullYear()} Природні Мандри. Усі права захищені.
        </p>
      </div>
    </footer>
  );
}