'use client';

import { useState } from 'react';
import Image from 'next/image';
import css from './userBar.module.css';

type UserBarProps = {
  user?: {
    name: string;
    avatarUrl?: string;
  };
};

export default function UserBar({ user }: UserBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userName = user?.name || 'Користувач';
  const userAvatar = user?.avatarUrl || '/Icons/avatar.svg';

  return (
    <div className={css.wrapper}>
      <div className={css.profileInfo}>
        <Image
          src={userAvatar}
          alt="Аватар"
          width={40}
          height={40}
          className={css.avatar}
        />
        <span className={css.name}>{userName}</span>
      </div>

      <div className={css.divider}></div>

      <button
        type="button"
        className={css.logoutBtn}
        onClick={() => setIsModalOpen(true)}
      >
        <Image src="/Icons/logout.svg" alt="Вихід" width={24} height={24} />
      </button>

      {isModalOpen && (
        <div className={css.modalOverlay}>
          <div className={css.modalBox}>
            <button
              type="button"
              className={css.closeBtn}
              onClick={() => setIsModalOpen(false)}
            >
              <Image
                src="/Icons/close.svg"
                alt="Закрити"
                width={20}
                height={20}
              />
            </button>

            <h2 className={css.modalTitle}>Ви точно хочете вийти?</h2>
            <p className={css.modalSubtitle}>Ми будемо сумувати за вами!</p>

            <div className={css.modalButtons}>
              <button
                className={css.cancelBtn}
                onClick={() => setIsModalOpen(false)}
              >
                Відмінити
              </button>
              <button
                className={css.confirmBtn}
                onClick={() => {
                  setIsModalOpen(false);
                  alert('Вихід із системи...');
                }}
              >
                Вийти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
