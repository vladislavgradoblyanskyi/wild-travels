'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import headerCss from '../Header/header.module.css';
import localCss from './authBar.module.css';

export default function AuthBar() {
  const pathname = usePathname();
  const isLoginActive = pathname === '/login';

  const loginClass = isLoginActive
    ? headerCss.btnPrimary
    : headerCss.btnInverted;
  const registerClass = !isLoginActive
    ? headerCss.btnPrimary
    : headerCss.btnInverted;

  return (
    <div className={localCss.authBarWrapper}>
      <Link href="/login" className={`${headerCss.btnPrimary} ${loginClass}`}>
        Вхід
      </Link>
      <Link
        href="/register"
        className={`${headerCss.btnPrimary} ${registerClass}`}
      >
        Реєстрація
      </Link>
    </div>
  );
}
