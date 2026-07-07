import css from "./RecommendedStories.module.scss";

import { StoryCard } from "../../../components/StoryCard/StoryCard";

import type { Story } from "../../../types/story";

type Props = {
  stories: Story[];
};

export const RecommendedStories = ({
  stories,
}: Props) => {
  if (!stories.length) {
    return null;
  }

  return (
    <section>
      <h2>
        Вам також сподобається
      </h2>

      <div className={css.list}>
        {stories.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
          />
        ))}
      </div>
    </section>
  );
};