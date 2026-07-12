'use client';

import { Button } from '@/components/ui/buttons/btn';
import { Icon } from '@/components/ui/Icon/Icon';
import styles from './SaveStoryButton.module.css';

type Props = {
  isSaved: boolean;
  isLoading?: boolean;
  onClick: () => void;
  className?: string;
};

export default function SaveStoryButton({
  isSaved,
  isLoading = false,
  onClick,
  className = '',
}: Props) {
  return (
    <Button
      type="button"
      variant="tertiary"
      className={`${isSaved ? styles.savedIcon : ''} ${className}`.trim()}
      onClick={onClick}
      disabled={isLoading}
      aria-pressed={isSaved}
      aria-label={isSaved ? 'Прибрати зі збереженого' : 'Зберегти статтю'}
    >
      <Icon
        name="icon-bookmark"
        className={isLoading ? styles.loadingIcon : ''}
        width={20}
        height={20}
      />
    </Button>
  );
}

export function SaveButton({
  isSaved,
  isLoading,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      className={styles.button}
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