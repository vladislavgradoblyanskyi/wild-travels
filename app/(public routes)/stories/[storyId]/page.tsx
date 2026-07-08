"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import ErrorWhileSavingModal from "../../../../components/UI/ErrorWhileSavingModal/ErrorWhileSavingModal";

import StoryDetails from "../../../../components/StoryPage/StoryDetails/StoryDetails";
import SaveStory from "../../../../components/StoryPage/SaveStory/SaveStory";
import { RecommendedStories } from "../../../../components/StoryPage/RecomendedStories/RecommendedStories";

import type { Story } from "../../../../types/story";
import {
  getStoryById,
  addSavedArticle,
  removeSavedArticle,
} from "../../../../lib/api/storyApi";

export default function StoryPage() {
  const { storyId } = useParams();

  const [story, setStory] = useState<Story | null>(null);
  const [recommended, setRecommended] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
  if (!story) return;

  try {
    setSaveLoading(true);

    if (isSaved) {
      await removeSavedArticle(story._id);

      setIsSaved(false);

      setStory((prev) =>
        prev
          ? {
              ...prev,
              isSaved: false,
              savedCount: Math.max(prev.savedCount - 1, 0),
            }
          : prev
      );
    } else {
      await addSavedArticle(story._id);

      setIsSaved(true);

      setStory((prev) =>
        prev
          ? {
              ...prev,
              isSaved: true,
              savedCount: prev.savedCount + 1,
            }
          : prev
      );
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        setShowModal(true);
        return;
      }

      toast.error(
        error.response?.data?.message ||
          "Не вдалося зберегти історію"
      );
    } else {
      toast.error("Сталася невідома помилка");
    }
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
  <>
    <main>
      <StoryDetails story={story} />

      <SaveStory
        isSaved={isSaved}
        isLoading={saveLoading}
        onSave={handleSave}
      />

      <RecommendedStories stories={recommended} />
    </main>

    {showModal && (
      <ErrorWhileSavingModal
        onClose={() => setShowModal(false)}
      />
    )}
  </>
);
}