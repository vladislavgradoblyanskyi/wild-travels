'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/buttons/btn';
import type { Story } from '@/types/story';
import styles from './StoryCard.module.css';

type Props = {
  story: Story;
  isSaved?: boolean;
  isPriority?: boolean;
  onSave?: (id: string) => void;
};

function getMetaPrimary(story: Story) {
  if (story.author?.name) return story.author.name;
  if (typeof story.ownerId === 'object' && story.ownerId?.name) {
    return story.ownerId.name;
  }

  if (typeof story.category === 'object' && story.category?.category) {
    return story.category.category;
  }
  if (typeof story.category === 'string') {
    return story.category;
  }

  return 'Без категорії';
}

export default function StoryCard({
  story,
  isSaved = false,
  isPriority = false,
  onSave,
}: Props) {
  const router = useRouter();
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
          <Button
            type="button"
            variant="secondary"
            className={styles.infoBtn}
            onClick={() => router.push(`/stories/${story._id}`)}
          >
            Переглянути статтю
          </Button>

          <Button
            type="button"
            variant="secondary"
            className={`${styles.iconBtn} ${isSaved ? styles.iconBtnActive : ''}`}
            onClick={() => onSave?.(story._id)}
            aria-label={saveLabel}
            title={saveLabel}
          >
            <svg width="20" height="20" aria-hidden="true">
              <use href="/Icons/icons.svg#icon-bookmark" />
            </svg>
          </Button>
        </div>
      </div>
    </article>
  );
}
