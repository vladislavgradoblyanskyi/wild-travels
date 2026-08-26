
'use client';

import { ReactNode, MouseEvent, useEffect } from 'react';
import styles from './Modal.module.css';
import { Icon } from '../Icon/Icon';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export const Modal = ({ isOpen, onClose, children, title }: Props) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = () => {
    onClose();
  };

  const handleContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} onClick={handleContentClick}>
        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon id="close" width={20} height={20} name={'close-modal'} />
        </button>

        {title && <h2 className={styles.title}>{title}</h2>}

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};