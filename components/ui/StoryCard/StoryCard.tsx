'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Story } from '@/types/story';
import styles from './StoryCard.module.css';

type Props = {
  story: Story;
  isSaved?: boolean;
  isPriority?: boolean;
  onSave?: (id: string) => void;
};

function getMetaPrimary(story: Story) {
  if (story.author?.name) {
    return story.author.name;
  }

  if (typeof story.ownerId === 'object' && story.ownerId?.name) {
    return story.ownerId.name;
  }

  if (typeof story.category === 'object') {
    return story.category.category;
  }

  return story.category;
}

export default function StoryCard({
  story,
  isSaved = false,
  isPriority = false,
  onSave,
}: Props) {
  const metaPrimary = getMetaPrimary(story);
  const saveLabel = isSaved ? 'Збережено' : 'Зберегти';

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={story.img}
          alt={story.title}
          fill
          className={styles.image}
          priority={isPriority}
          sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className={styles.content}>
        <p className={styles.meta}>
          <span className={styles.name}>{metaPrimary}</span>
          <span className={styles.metaSeparator}>•</span>
          <span className={styles.savedMeta}>
            {story.savedCount}
            <svg
              className={styles.savedMetaIcon}
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use href="/Icons/icons.svg#icon-bookmark" />
            </svg>
          </span>
        </p>

        <h3 className={styles.title}>{story.title}</h3>

        <div className={styles.actions}>
          <Link href={`/stories/${story._id}`} className={styles.infoBtn}>
            Переглянути статтю
          </Link>

          <button
            type="button"
            className={`${styles.iconBtn} ${isSaved ? styles.iconBtnActive : ''}`}
            onClick={() => onSave?.(story._id)}
            aria-label={saveLabel}
            title={saveLabel}
          >
            <svg width="20" height="20" aria-hidden="true">
              <use href="/Icons/icons.svg#icon-bookmark" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
