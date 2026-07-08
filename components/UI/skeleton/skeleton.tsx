import clsx from 'clsx';
import type { CSSProperties, HTMLAttributes } from 'react';
import styles from './Skeleton.module.css';

type SkeletonVariant =
  | 'text'
  | 'title'
  | 'circle'
  | 'avatar'
  | 'button'
  | 'input'
  | 'card'
  | 'image';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  lines?: number;
  width?: number | string;
  height?: number | string;
  animated?: boolean;
}

interface SkeletonPageTitleProps extends Omit<SkeletonProps, 'variant'> {
  tag?: 'h1' | 'h2' | 'h3';
}

const titleHeight: Record<'h1' | 'h2' | 'h3', number> = {
  h1: 40,
  h2: 34,
  h3: 22,
};

const variantStyles: Record<SkeletonVariant, string> = {
  text: styles.text,
  title: styles.title,
  circle: styles.circle,
  avatar: styles.avatar,
  button: styles.button,
  input: styles.input,
  card: styles.card,
  image: styles.image,
};

export const Skeleton = ({
  variant = 'text',
  lines = 1,
  width,
  height,
  animated = true,
  className,
  style,
  ...props
}: SkeletonProps) => {
  const mergedStyle: CSSProperties = {
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  if (lines <= 1) {
    return (
      <div
        className={clsx(
          styles.skeleton,
          variantStyles[variant],
          animated && styles.animated,
          className,
        )}
        style={mergedStyle}
        aria-hidden="true"
        {...props}
      />
    );
  }

  return (
    <div
      className={clsx(styles.stack, className)}
      aria-hidden="true"
      {...props}
    >
      {Array.from({ length: lines }).map((_, lineIndex) => {
        const lastLine = lineIndex === lines - 1;

        return (
          <div
            key={`skeleton-line-${lineIndex}`}
            className={clsx(
              styles.skeleton,
              variantStyles[variant],
              animated && styles.animated,
              lastLine && styles.lastLine,
            )}
            style={
              lastLine
                ? { ...mergedStyle, width: width ?? '72%' }
                : mergedStyle
            }
          />
        );
      })}
    </div>
  );
};

export const SkeletonAvatar = (props: Omit<SkeletonProps, 'variant'>) => (
  <Skeleton variant="avatar" {...props} />
);

export const SkeletonInput = (props: Omit<SkeletonProps, 'variant'>) => (
  <Skeleton variant="input" {...props} />
);

export const SkeletonButton = (props: Omit<SkeletonProps, 'variant'>) => (
  <Skeleton variant="button" {...props} />
);

export const SkeletonCard = (props: Omit<SkeletonProps, 'variant'>) => (
  <Skeleton variant="card" {...props} />
);

export const SkeletonImage = (props: Omit<SkeletonProps, 'variant'>) => (
  <Skeleton variant="image" {...props} />
);

export const SkeletonPageTitle = ({
  tag = 'h1',
  ...props
}: SkeletonPageTitleProps) => (
  <Skeleton variant="title" height={titleHeight[tag]} {...props} />
);