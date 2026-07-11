import StoryCard from '@/components/ui/StoryCard/StoryCard';
import { PageTitle } from '@/components/Ui/PageTitle/PageTitle';
import type { Story } from '@/types/story';
import css from './RecommendedStories.module.css';

type Props = {
  stories: Story[];
  onSave?: (id: string) => void;
};

export const RecommendedStories = ({
  stories,
  onSave,
}: Props) => {
  if (!stories.length) {
    return null;
  }

  return (
    <section className={css.section}>
      <PageTitle tag="h2" className={css.title}>
        Вам також сподобається
      </PageTitle>

      <div className={css.list}>
        {stories.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
            onSave={onSave}
          />
        ))}
      </div>
    </section>
  );
};