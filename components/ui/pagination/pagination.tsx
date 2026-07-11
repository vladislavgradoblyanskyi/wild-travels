import { Button } from '../buttons/btn';
import styles from './pagination.module.css';

interface PaginationProps {
  onClick: () => void;
  isLoading?: boolean;
  isVisible: boolean;
  className?: string;
}

export const Pagination = ({
  onClick,
  isLoading = false,
  isVisible,
  className = '',
}: PaginationProps) => {
  if (!isVisible) return null;

  return (
    <div className={`${styles.container} ${className}`}>
      <Button
        variant="primary"
        onClick={onClick}
        disabled={isLoading}
        className={styles.loadMoreBtn}
      >
        {isLoading ? 'Завантаження...' : 'Показати ще'}
      </Button>
    </div>
  );
};
