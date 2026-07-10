"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";

import { useAuthStore } from "../../../../lib/store/useAuthStore";
import ErrorWhileSavingModal from "../../../../components/UI/ErrorWhileSavingModal/ErrorWhileSavingModal";

import StoryDetails from "../../../../components/StoryPage/StoryDetails/StoryDetails";
import SaveStory from "../../../../components/StoryPage/SaveStory/SaveStory";
import { RecommendedStories } from "../../../../components/StoryPage/RecomendedStories/RecommendedStories";
import LoaderComponent from "../../../../components/Loader/Loader";
import NotFound from "./not-found";

import type { Story } from "../../../../types/story";
import { getStoryById } from "../../../../lib/api/storyApi";
import { saveStory, unsaveStory } from "../../../../lib/api/clientApi";
import css from "./page.module.css";

export default function StoryPage() {
  const params = useParams<{ storyId: string }>();
  const storyId = params.storyId;
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [story, setStory] = useState<Story | null>(null);
  const [recommended, setRecommended] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadStory = async () => {
      try {
        setLoading(true);

        const data = await getStoryById(storyId);

        setStory(data.story);
        setRecommended(data.recommendedStories);
        setIsSaved(data.story.isSaved ?? false);
      } catch (error) {
        console.error(error);
        setStory(null);
      } finally {
        setLoading(false);
      }
    };

    if (storyId) {
      loadStory();
    }
  }, [storyId]);

  const handleSave = async () => {
    if (!story) return;

    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }

    setSaveLoading(true);
    try {
      if (isSaved) {
        await unsaveStory(story._id);
        setIsSaved(false);
        toast.success("Історію видалено зі збережених");
      } else {
        await saveStory(story._id);
        setIsSaved(true);
        toast.success("Історію збережено");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Помилка збереження";
      toast.error(message);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return <LoaderComponent />;
  }

  if (!story) {
    return <NotFound />;
  }

  return (
    <main className={css.page}>
      <StoryDetails story={story} />

      <SaveStory isSaved={isSaved} isLoading={saveLoading} onSave={handleSave} />

      <RecommendedStories stories={recommended} />

      {showModal && (
        <ErrorWhileSavingModal onClose={() => setShowModal(false)} />
      )}
    </main>
  );
}
