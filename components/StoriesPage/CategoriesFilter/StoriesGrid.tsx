import StoryCard from '@/components/ui/StoryCard/StoryCard';
import type { Story } from '@/types/story';
import styles from './StoriesGrid.module.css';

type Props = {
  stories: Story[];
  savedStoryIds: Set<string>;
  onSave: (id: string) => void;
};

export default function StoriesGrid({
  stories,
  savedStoryIds,
  onSave,
}: Props) {
  return (
    <div className={styles.grid}>
      {stories.map((story, index) => (
        <StoryCard
          key={story._id}
          story={story}
          isPriority={index < 3}
          isSaved={savedStoryIds.has(story._id)}
          onSave={onSave}
        />
      ))}
    </div>
  );
}
