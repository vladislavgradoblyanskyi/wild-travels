'use client';
import { usePathname } from 'next/navigation';
import css from './loginBar.module.css';
import { motion } from 'motion/react';

import Link from 'next/link';
export default function LoginBar() {
  const pathname = usePathname();
  return (
    <nav className={css.navigation}>
      <ul className={css.navigationList}>
        <motion.li
          className={css.navigationListItem}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Link
            href="/register"
            className={`${css.tab} ${
              pathname === '/register' ? css.active : ''
            }`}
          >
            Реєстрація
          </Link>
        </motion.li>
        <motion.li
          className={css.navigationListItem}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Link
            href="/login"
            className={`${css.tab} ${pathname === '/login' ? css.active : ''}`}
          >
            Вхід
          </Link>
        </motion.li>
      </ul>
    </nav>
  );
}
