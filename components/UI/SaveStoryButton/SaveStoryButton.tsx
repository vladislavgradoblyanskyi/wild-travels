'use client';
/// не готово треба ще storiesApi useStoriesStore useAuthModal
// import { useState } from 'react';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { Button } from '@/components/ui/Button/Button';
// import { Icon } from '@/components/ui/Icon/Icon';
// import styles from './SaveStoryButton.module.css';



// import { storiesApi } from '@/lib/api/clientApi';

import css from "./SaveStoryButton.module.css";

type Props = {
  isSaved: boolean;
  isLoading: boolean;
  onClick: () => void;
};

export default function SaveStoryButton({
  isSaved,
  isLoading,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      className={css.button}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading
        ? "Завантаження..."
        : isSaved
        ? "Видалити зі збережених"
        : "Зберегти"}
    </button>
  );
}