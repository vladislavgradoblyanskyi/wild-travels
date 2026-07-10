"use client";

import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { useAuthStore } from "../../../../lib/store/useAuthStore";
import ErrorWhileSavingModal from "../../../../components/UI/ErrorWhileSavingModal/ErrorWhileSavingModal";
import { toast } from "react-hot-toast";

import StoryDetails from "../../../../components/StoryPage/StoryDetails/StoryDetails";
import SaveStory from "../../../../components/StoryPage/SaveStory/SaveStory";
import { RecommendedStories } from "../../../../components/StoryPage/RecomendedStories/RecommendedStories";
import LoaderComponent from "../../../../components/Loader/Loader"
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

      console.log("storyId =", storyId);


      const data = await getStoryById(storyId);


      console.log("PAGE DATA:", data);


      const storyData = data.story ?? data;


      setStory(storyData);


     const recommendedStories =
       await getRecommendedStories(storyData);


       setRecommended( recommendedStories);

      setIsSaved(
        storyData.isSaved ?? false
      );


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

  toast.success("Історію видалено зі збережених");
} else {
  await addSavedArticle(story._id);

  setIsSaved(true);

  toast.success("Історію збережено");
}
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    
      console.log("STATUS:", err.response?.status);
  console.log("URL:", err.config?.url);
  console.log("DATA:", err.response?.data);
  console.log("FULL ERROR:", err);

  toast.error(
    err.response?.data?.error ?? "Помилка збереження"
  );
} finally {
    setSaveLoading(false);
  }
};

  if (loading) {
    return <LoaderComponent/>;
  }

  if (!story) {
    return <NotFound/>;
  }

return (
  <main className={css.page}>
    <StoryDetails story={story} />

    <SaveStory
      isSaved={isSaved}
      isLoading={saveLoading}
      onSave={handleSave}
    />

    <RecommendedStories stories={recommended} />

    {showModal && (
      <ErrorWhileSavingModal
        onClose={() => setShowModal(false)}
      />
    )}
  </main>
);
}
