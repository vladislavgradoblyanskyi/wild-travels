import Link from 'next/link';
import styles from './MessageNoStories.module.css';

interface MessageNoStoriesProps {
  text: string;
  buttonText: string;
  linkTo?: string;
  onAction?: () => void;
}

export default function MessageNoStories({
  text,
  buttonText,
  linkTo,
  onAction,
}: MessageNoStoriesProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>{text}</p>
      {linkTo ? (
        <Link href={linkTo} className={styles.button}>
          {buttonText}
        </Link>
      ) : (
        <button type="button" className={styles.button} onClick={onAction}>
          {buttonText}
        </button>
      )}
    </div>
  );
}
