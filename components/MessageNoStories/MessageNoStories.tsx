import Link from 'next/link';
/* Імпортуємо системний UI-компонент Button */
import { Button } from '@/components/UI/buttons/btn';
import styles from './MessageNoStories.module.css';

interface MessageNoStoriesProps {
  text: string;
  buttonText: string;
  linkTo: string;
}

export default function MessageNoStories({
  text,
  buttonText,
  linkTo,
}: MessageNoStoriesProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>{text}</p>
      <Link href={linkTo} passHref legacyBehavior>
        <Button variant="primary" className={styles.button}>
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}
