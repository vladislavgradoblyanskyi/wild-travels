"use client";
import { StoryCard } from "../components/StoryCard/StoryCard";

export default function HomePage() {
  const story = {
    id: "1",
    title: "Тестова історія",
    description: "Це опис для перевірки компонента.",
    coverUrl: "https://picsum.photos/300/200",
    author: {
      name: "Іван Петренко",
    },
    createdAt: new Date().toISOString(),
  };

  return (
    <main style={{ padding: "20px" }}>
      <StoryCard
        story={story}
        onOpen={(id) => console.log(id)}
        onSave={(id) => console.log(id)}
      />
    </main>
  );
}