'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './btn.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  isLoading?: boolean;
};

export function Button(props: Props) {
  const {
    children,
    variant = 'primary',
    isLoading = false,
    disabled,
    className,
    ...rest
  } = props;

  const classes = [styles.button, styles[variant], className ?? '']
    .join(' ')
    .trim();

  const isDisabled = Boolean(disabled || isLoading);

  return (
    <button
      {...rest}
      className={classes}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
    >
      {isLoading ? 'Завантаження...' : children}
    </button>
  );
}
