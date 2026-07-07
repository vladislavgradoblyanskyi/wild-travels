"use client";

import StoryCard from "@/components/ui/StoryCard/StoryCard";
import styles from "./page.module.css";

export default function Page() {
  const stories = [
    {
      _id: "1",
      title: "Тест 1",
      img: "https://picsum.photos/500/400",
      rate: 4.8,
      ownerId: { name: "Іван" },
    },
    {
      _id: "2",
      title: "Тест 2",
      img: "https://picsum.photos/501/400",
      rate: 4.2,
      ownerId: { name: "Оля" },
    },
    {
      _id: "3",
      title: "Тест 3",
      img: "https://picsum.photos/502/400",
      rate: 3.9,
      ownerId: { name: "Петро" },
    },
  ];

  return (
    <div className={styles.container}>
      <h1 style={{ marginBottom: 20 }}>Stories</h1>

      <div className={styles.grid}>
        {stories.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
            isSaved={false}
            onOpen={(id: string) => console.log("open", id)}
            onSave={(id: string) => console.log("save", id)}
          />
        ))}
      </div>
    </div>
  );
}