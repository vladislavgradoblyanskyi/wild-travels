"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import StoryDetails from "../../../../components/StoryPage/StoryDetails/StoryDetails";
import SaveStory from "../../../../components/StoryPage/SaveStory/SaveStory";
import { RecommendedStories } from "../../../../components/StoryPage/RecomendedStories/RecomendedStories";

import type { Story } from "../../../../types/story";
import { getStoryById } from "../../../../lib/api/storyApi";

export default function StoryPage() {
  const { storyId } = useParams();

  const [story, setStory] = useState<Story | null>(null);
  const [recommended, setRecommended] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    async function loadStory() {
      try {
        const data = await getStoryById(storyId as string);

        setStory(data.story);
        setRecommended(data.recommendedStories);
        setIsSaved(data.story.isSaved);
      } catch {
        setStory(null);
      } finally {
        setLoading(false);
      }
    }

    if (storyId) {
      loadStory();
    }
  }, [storyId]);

  const handleSave = async () => {
    try {
      setSaveLoading(true);


      setIsSaved((prev) => !prev);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (!story) {
    return <p>Така історія відсутня</p>;
  }

  return (
    <main>
      <StoryDetails story={story} />
      <SaveStory
        isSaved={isSaved}
        isLoading={saveLoading}
        onSave={handleSave}
      />
      <RecommendedStories stories={recommended} />
    </main>
  );
}