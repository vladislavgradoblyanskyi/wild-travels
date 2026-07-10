'use client';

import { useAuthStore } from '@/lib/store/useAuthStore';
/// import { useStoriesStore } from '@/lib/store/useStoriesStore';
import Image from 'next/image';
import { Icon } from '../Icon/Icon';
import { PageTitle } from '../PageTitle/PageTitle';
import { Story } from '@/types/story';
import { CustomLink } from '../Link/Link';
import SaveStoryButton  from '../SaveStoryButton/SaveStoryButton';
import styles from '@/components/ui/StoryCard/StoryCard.module.css';
import { useEffect } from 'react';

type Props = {
  story: Story;
  isPriority?: boolean;
};

export default function StoryCard({ story, isPriority = false }: Props) {
  const { title, img, ownerId } = story;

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const initialIsSaved = useStoriesStore(
    (s) => s.savedStories[story._id] ?? false,
  );

  const storyRateFromStore = useStoriesStore((s) => s.storiesRate[story._id]);

  const rate = storyRateFromStore ?? story.rate;

  const initStoryRate = useStoriesStore((s) => s.initStoryRate);

  useEffect(() => {
    if (storyRateFromStore === undefined) {
      initStoryRate(story._id, story.rate);
    }
  }, [story._id, story.rate, storyRateFromStore, initStoryRate]);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper} aria-hidden="true">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          className={styles.image}
          {...(isPriority ? { priority: true } : { loading: 'lazy' })}
        />
      </div>

      <div className={styles.content}>
        <p className={styles.meta}>
          {ownerId.name}
          <span className={styles.metaSeparator}>·</span>
          {rate}
          <Icon
            name="icon-bookmark"
            width={16}
            height={16}
            className={styles.svg}
          />
        </p>

        <PageTitle className={styles.title} tag="h3">
          {title}
        </PageTitle>

        <div className={styles.actions}>
          <CustomLink
            href={`/stories/${story._id}`}
            variant="secondary"
            className={styles.infoBtn}
          >
            Переглянути статтю
          </CustomLink>

          <SaveStoryButton
            storyId={story._id}
            initialIsSaved={initialIsSaved}
            isAuthenticated={isAuthenticated}
            variant="icon"
            className={styles.iconBtn}
          />
        </div>
      </div>
    </div>
  );
}