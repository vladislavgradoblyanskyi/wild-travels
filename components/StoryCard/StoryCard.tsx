import React from "react";
import styles from "./StoryCard.module.css";

export type Story = {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  author: {
    name: string;
  };
  createdAt: string;
};

type Props = {
  story: Story;
  isSaved?: boolean;
  onOpen?: (id: string) => void;
  onSave?: (id: string) => void;
};

export const StoryCard: React.FC<Props> = ({
  story,
  isSaved = false,
  onOpen,
  onSave,
}) => {
  return (
    <div className={styles.CC}>
      <img className={styles.cover} src={story.coverUrl} alt={story.title} />
      <div className={styles.CCDescription}>
        <h3 className={styles.CTitle}>{story.title}</h3>
        <p className={styles.description }>
          {story.description.length > 120
            ? story.description.slice(0, 120) + "..."
            : story.description}
        </p>
        <div className={styles.meta}>
          <span>{story.author.name}</span>
          <span>{new Date(story.createdAt).toLocaleDateString()}</span>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.openBtn}
            onClick={() => onOpen?.(story.id)}
          >
            Відкрити 
          </button>
          <button
            className={`${styles.saveBtn} ${isSaved ? styles.saved : ""}`}
            onClick={() => onSave?.(story.id)}
          >
            {isSaved ? "Збережено" : "Зберегти"}
          </button>
        </div>
      </div>
    </div>
  

        


       
    
    ) 
};