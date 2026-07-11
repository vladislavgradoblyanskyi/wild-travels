"use client";

import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";

import { useAuthStore } from "../../../../lib/store/useAuthStore";

import StoryDetails from "../../../../components/StoryPage/StoryDetails/StoryDetails";
import SaveStory from "../../../../components/StoryPage/SaveStory/SaveStory";
import { RecommendedStories } from "../../../../components/StoryPage/RecomendedStories/RecommendedStories";
import LoaderComponent from "../../../../components/Loader/Loader";
import ErrorWhileSavingModal from "../../../../components/ui/ErrorWhileSavingModal/ErrorWhileSavingModal";
import NotFound from "./not-found";

import type { Story } from "../../../../types/story";

import {
  getStoryById,
  getRecommendedStories,
  addSavedArticle,
  removeSavedArticle,
} from "../../../../lib/api/storyApi";

import css from "./page.module.css";

export default function StoryPage() {
  const params = useParams<{ storyId: string }>();
  const storyId = params.storyId;

  const [story, setStory] = useState<Story | null>(null);
  const [recommended, setRecommended] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  useEffect(() => {
    const loadStory = async () => {
      try {
        setLoading(true);

        const data = await getStoryById(storyId);

        const storyData = data.story ?? data;

        setStory(storyData);

        const recommendedStories =
          await getRecommendedStories(storyData);

        setRecommended(recommendedStories);

        setIsSaved(storyData.isSaved ?? false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (storyId) {
      loadStory();
    }
  }, [storyId]);

  const handleRecommendedSave = async (id: string) => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }

    try {
      const current = recommended.find(
        (story) => story._id === id
      );

      if (!current) return;

      console.log("Recommended story:", current);
      console.log({
  id: current?._id,
  title: current?.title,
  isSaved: current?.isSaved,
      });
      

      if (current.isSaved) {
        await removeSavedArticle(id);

        toast.success("Історію видалено зі збережених");
      } else {
        await addSavedArticle(id);

        toast.success("Історію збережено");
      }

      setRecommended((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                isSaved: !item.isSaved,
                savedCount:
                  item.savedCount +
                  (item.isSaved ? -1 : 1),
              }
            : item
        )
      );
} catch (error) {
  const err = error as AxiosError<{ error: string }>;

  if (err.response?.status === 409) {
    toast.success("Історія вже збережена");

    setRecommended((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              isSaved: true,
            }
          : item
      )
    );

    return;
  }

  console.error(error);

  toast.error(
    err.response?.data?.error ??
      "Помилка збереження"
  );
}
  };

  const handleSave = async () => {
    if (!story) return;

    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }

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
                savedCount: prev.savedCount - 1,
              }
            : prev
        );

        toast.success("Історію видалено зі збережених");
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

        toast.success("Історію збережено");
      }
} catch (error) {
  const err = error as AxiosError<{ error: string }>;

  console.log("STATUS:", err.response?.status);
  console.log("URL:", err.config?.url);
  console.log("DATA:", err.response?.data);

  if (err.response?.status === 409) {
    setIsSaved(true);

    setStory((prev) =>
      prev
        ? {
            ...prev,
            isSaved: true,
          }
        : prev
    );

    toast.success("Історія вже була збережена");

    return;
  }

  toast.error(
    err.response?.data?.error ??
      "Помилка збереження"
  );
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

      <SaveStory
        isSaved={isSaved}
        isLoading={saveLoading}
        onSave={handleSave}
      />

      <RecommendedStories
        stories={recommended}
        onSave={handleRecommendedSave}
      />

      {showModal && (
        <ErrorWhileSavingModal
          onClose={() => setShowModal(false)}
        />
      )}
  </main>
);
}