import styles from "./StoryCard.module.css";

import type { Story } from "../../types/story";

type Props = {
  story: Story;
  onOpen?: (id: string) => void;
};

export const StoryCard = ({
  story,
  onOpen,
}: Props) => {
  return (
    <div className={styles.CCDescription}>
      <div className={styles.autorname}>
        <span>
          {story.author.name}
        </span>

        <span>
          {story.savedCount} 💾
        </span>
      </div>

      <div className={styles.PCard}>
        <h3 className={styles.CTitle}>
          {story.title.length > 120
            ? `${story.title.slice(0, 120)}...`
            : story.title}
        </h3>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.openBtn}
          onClick={() => onOpen?.(story._id)}
        >
          Переглянути статтю
        </button>
      </div>
    </div>
  );
};