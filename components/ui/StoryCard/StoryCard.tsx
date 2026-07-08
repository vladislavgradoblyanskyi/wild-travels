"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./StoryCard.module.css";

import type { Story } from "../../../types/story";

type Props = {
  story: Story;
  isSaved?: boolean;
  isPriority?: boolean;
  onSave?: (id: string) => void;
};

export default function StoryCard({
  story,
  isSaved = false,
  isPriority = false,
  onSave,
}: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={story.img}
          alt={story.title}
          fill
          priority={isPriority}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <p className={styles.meta}>
          {story.author.name}
        </p>

        <h3 className={styles.title}>
          {story.title}
        </h3>

        <div className={styles.actions}>
          <Link
              href={`/stories/${story._id}`}
              className={styles.infoBtn}
           >   
              Переглянути статтю
          </Link>

          <button
            className={styles.iconBtn}
            onClick={() => onSave?.(story._id)}
            aria-label={isSaved ? "Збережено" : "Зберегти"}
          >
            {isSaved ? "★" : "☆"}
          </button>
        </div>
      </div>
    </article>
  );
}