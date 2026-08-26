'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import css from './header.module.css';

import AuthBar from '../AuthBar/AuthBar';
import UserBar from '../UserBar/UserBar';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/useAuthStore';

export default function Header() {
  const pathname = usePathname();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const isAuthorized = !!user;

  const toggleBurger = () => setIsBurgerOpen(!isBurgerOpen);
  const closeBurger = () => setIsBurgerOpen(false);

  const verifyAuth = useCallback(async () => {
    const hasCookies =
      typeof document !== 'undefined' && document.cookie.length > 0;

    if (!hasCookies) {
      clearIsAuthenticated();
      return;
    }

    try {
      const loggedIn = await checkSession();
      if (loggedIn) {
        if (!user) {
          const userData = await getMe();
          setUser(userData);
        }
      } else {
        clearIsAuthenticated();
      }
    } catch (error) {
      console.error('Помилка авторизації:', error);
      clearIsAuthenticated();
    }
  }, [user, setUser, clearIsAuthenticated]);

  useEffect(() => {
    const runVerification = async () => {
      await verifyAuth();
    };
    runVerification();
  }, [pathname, verifyAuth]);

  useEffect(() => {
    const handleAuthChange = async () => {
      await verifyAuth();
    };

    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('focus', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('focus', handleAuthChange);
    };
  }, [verifyAuth]);

  useEffect(() => {
    if (isBurgerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBurgerOpen]);

  const currentLinks = [
    { name: 'Головна', href: '/' },
    { name: 'Статті', href: '/stories' },
    { name: 'Еко-Мандрівники', href: '/travellers' },
  ];

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo} onClick={closeBurger}>
          <Image
            src="/Icons/logo.svg"
            alt="Природні Мандри"
            className={css.logoSvg}
            width={124}
            height={36}
            priority
          />
        </Link>

        <nav className={css.desktopNav}>
          {currentLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${css.navLink} ${
                pathname === link.href ? css.activeLink : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
          {isAuthorized && (
            <Link
              href="/profile"
              className={`${css.navLink} ${
                pathname === '/profile' ? css.activeLink : ''
              }`}
            >
              Мій Профіль
            </Link>
          )}
        </nav>

        <div className={css.headerActions}>
          {!isAuthorized ? (
            <div className={css.guestWrapper}>
              <div className={css.tabletDesktopAuthWrapper}>
                <AuthBar />
              </div>

              <button
                className={css.burgerButton}
                onClick={toggleBurger}
                aria-label="Menu"
              >
                <Image
                  src={isBurgerOpen ? '/Icons/close.svg' : '/Icons/menu.svg'}
                  alt="Menu"
                  className={css.burgerIcon}
                  width={24}
                  height={24}
                />
              </button>
            </div>
          ) : (
            <div className={css.userWrapper}>
              <div className={css.tabletDesktopPublishWrapper}>
                <Link href="/stories/new" className={css.btnPrimary}>
                  Опублікувати статтю
                </Link>
              </div>

              <div className={css.userProfileHeaderHiddenTablet}>
                <UserBar user={user} />
              </div>

              <button
                className={css.burgerButton}
                onClick={toggleBurger}
                aria-label="Menu"
              >
                <Image
                  src={isBurgerOpen ? '/Icons/close.svg' : '/Icons/menu.svg'}
                  alt="Menu"
                  className={css.burgerIcon}
                  width={24}
                  height={24}
                />
              </button>
            </div>
          )}
        </div>

        <div
          className={`${css.burgerMenu} ${
            isBurgerOpen ? css.burgerMenuOpen : ''
          }`}
        >
          <div className={css.burgerMenuContent}>
            <nav className={css.burgerNav}>
              {currentLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeBurger}
                  className={pathname === link.href ? css.activeLink : ''}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className={css.burgerFooter}>
              {!isAuthorized ? (
                isBurgerOpen && (
                  <div className={css.burgerMobileActionOnly}>
                    <AuthBar />
                  </div>
                )
              ) : (
                <>
                  <div className={css.burgerMobileActionOnly}>
                    <Link
                      href="/stories/new"
                      className={`${css.btnPrimary} ${css.fullWidthBtn}`}
                      onClick={closeBurger}
                    >
                      Опублікувати статтю
                    </Link>
                  </div>
                  <div className={css.burgerUserProfileCentered}>
                    <Link
                      href="/profile"
                      onClick={closeBurger}
                      className={css.burgerProfileLink}
                    >
                      <UserBar user={user} />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
