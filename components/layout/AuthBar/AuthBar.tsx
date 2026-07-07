'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import css from './authBar.module.css';
import { motion } from 'motion/react';

export default function AuthBar() {
  const pathname = usePathname();
  return (
    <div className="container">
      <nav className={css.navigation}>
        <ul className={css.navigationList}>
          <motion.li
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={css.navigationListItem}
          >
            <Link
              href="/register"
              className={`${css.tab} ${pathname === '/register' ? css.active : ''}`}
            >
              Реєстрація
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={css.navigationListItem}
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
    </div>
  );
}
