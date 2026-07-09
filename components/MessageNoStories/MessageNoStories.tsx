'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/UI/Buttons/Btn';
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
  const router = useRouter();

  const handleClick = () => {
    if (onAction) {
      onAction();
      return;
    }

    if (linkTo) {
      router.push(linkTo);
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>{text}</p>

      <Button variant="primary" className={styles.button} onClick={handleClick}>
        {buttonText}
      </Button>
    </div>
  );
}
