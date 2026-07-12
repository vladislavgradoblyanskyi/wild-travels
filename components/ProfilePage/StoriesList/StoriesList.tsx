'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

import StoriesGrid from '../../StoriesPage/CategoriesFilter/StoriesGrid';
import { removeSavedArticle } from '@/lib/api/storyApi';
import type { Story } from '@/types/story';
import css from './StoriesList.module.css';

interface Props {
  stories: Story[];
}

export default function StoriesPage({ stories }: Props) {
  const [currentStories, setCurrentStories] = useState<Story[]>(stories);

  const savedStoryIds = new Set(
    currentStories.map((story) => story._id),
  );

  const handleSave = async (storyId: string) => {
    try {
      await removeSavedArticle(storyId);

      setCurrentStories((prev) =>
        prev.filter(
          (story) => story._id !== storyId,
        ),
      );

      toast.success(
        'Історію видалено із збережених',
      );
    } catch {
      toast.error(
        'Не вдалося видалити історію',
      );
    }
  };

  return (
    <section className={css.section}>
      <div className={`container ${css.container}`}>
        <div className={css.results}>
            <StoriesGrid
              stories={currentStories}
              savedStoryIds={savedStoryIds}
              onSave={handleSave}
            />
        </div>
      </div>
    </section>
  );
}