'use client';

import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>{text}</p>

      <Button
        variant="primary"
        className={styles.button}
        onClick={() => router.push(linkTo)}
      >
        {buttonText}
      </Button>
    </div>
  );
}
