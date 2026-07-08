import StoryCard from '@/components/UI/StoryCard/StoryCard';
import type { Story } from '@/types/story';
import css from './RecommendedStories.module.css';

type Props = {
  stories: Story[];
};

export const RecommendedStories = ({ stories }: Props) => {
  if (!stories.length) {
    return null;
  }

  return (
    <section className={css.section}>
      <h2 className={css.title}>Вам також сподобається</h2>

      <div className={css.list}>
        {stories.map((story) => (
          <StoryCard key={story._id} story={story} />
        ))}
      </div>
    </section>
  );
};
