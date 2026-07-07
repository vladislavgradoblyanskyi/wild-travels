"use client";

import Image from "next/image";
import styles from "./StoryCard.module.css";



export type Story = {
  _id: string;
  title: string;
  img: string;
  rate: number;
  ownerId: {
    name: string;
  };
};
 
type Props = {
  story: Story;
  isSaved?: boolean;
  isPriority?: boolean;
  onOpen?: (id: string) => void;
  onSave?: (id: string) => void;
};

export default function StoryCard({
  story,
  isSaved = false,
  isPriority = false,
  onOpen,
  onSave,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={story.img}
          alt={story.title}
          fill
          className={styles.image}
          priority={isPriority}
        />
      </div>

      <div className={styles.content}>
        <p className={styles.meta}>
          {story.ownerId.name}
          <span className={styles.metaSeparator}>·</span>
          {story.rate}
        </p>

        <h3 className={styles.title}>{story.title}</h3>

        <div className={styles.actions}>
          <button
            className={styles.infoBtn}
            onClick={() => onOpen?.(story._id)}
          >
            Переглянути
          </button>

          <button
            className={styles.iconBtn}
            onClick={() => onSave?.(story._id)}
            aria-label={isSaved ? "Збережено" : "Зберегти"}
          >
            {isSaved ? "★" : "☆"}
          </button>
        </div>
      </div>
    </div>
  );
}