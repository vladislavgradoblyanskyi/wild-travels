'use client';
import { Icon } from '../Icon/Icon';
import styles from './Input.module.css';
import { forwardRef, InputHTMLAttributes, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

  label?: string;
  iconId?: string;
  error?: string;

}

export const Input = forwardRef<HTMLInputElement, InputProps>(  ({ label, error, iconId, className = '', id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className={`${styles.inputContainer} ${className}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <div className={styles.inputWrapper}>
          <input
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            id={inputId}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />

          {iconId && (
            <Icon
              name={iconId}
              className={styles.icon}
              width={20}
              height={20}
            />
          )}
        </div>
        {error && (
          <span id={errorId} className={styles.errorMessage}>
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';