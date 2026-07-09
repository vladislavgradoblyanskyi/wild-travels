"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import StoryDetails from "../../../../components/StoryPage/StoryDetails/StoryDetails";
import SaveStory from "../../../../components/StoryPage/SaveStory/SaveStory";
import { RecommendedStories } from "../../../../components/StoryPage/RecomendedStories/RecommendedStories";

import type { Story } from "../../../../types/story";
import {
  getStoryById,
  getRecommendedStories,
} from "../../../../lib/api/storyApi";
import styles from "./page.module.css";

export default function StoryPage() {
const params = useParams<{ storyId: string }>();

const storyId = params.storyId;

  const [story, setStory] = useState<Story | null>(null);
  const [recommended, setRecommended] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

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
    return <p>Такої історії не існує</p>;
  }

 return (
  <div className={`container ${styles.container}`}>

    <StoryDetails story={story} />

    <SaveStory
      isSaved={isSaved}
      isLoading={saveLoading}
      onSave={handleSave}
    />

    <RecommendedStories stories={recommended} />

  </div>
);
}
