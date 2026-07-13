'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import StoriesGrid from '../../StoriesPage/CategoriesFilter/StoriesGrid';
import { Pagination } from '@/components/ui/pagination/pagination'
import { removeSavedArticle, GetSavedStories } from '@/lib/api/storyApi';
import type { Story } from '@/types/story';
import css from './StoriesList.module.css';

interface Props { 
  stories: Story[];
}
export default function StoriesPage({ stories }: Props) {
  const [perPage] = useState(() => {
    if (typeof window === 'undefined') return 6; 
    return window.innerWidth >= 1440 ? 6 : 4;
  });
  
  const [currentStories, setCurrentStories] = useState<Story[]>(() => stories ? stories.slice(0, perPage) : []);

  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [prevStories, setPrevStories] = useState<Story[]>(stories);
  if (stories !== prevStories) {
    setPrevStories(stories);
    setCurrentStories(stories.slice(0, perPage));
    setPage(1);
  }


  const savedStoryIds = new Set(currentStories.map((story) => story._id));

  const handleLoadMore = async () => {
    if (currentStories.length < stories.length) {
      setCurrentStories(stories);
      return;
    }
    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;

      const {data} = await GetSavedStories(nextPage, perPage); 
      
      setCurrentStories((prev) => [...prev, ...data]);
      setPage(nextPage);
    } catch (error) {
      console.error('Помилка пагінації:', error);
      toast.error('Не вдалося завантажити більше історій');
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSave = async (storyId: string) => {
    try {
      await removeSavedArticle(storyId);
      setCurrentStories((prev) => prev.filter((story) => story._id !== storyId));
      toast.success('Історію видалено із збережених');
    } 
    catch {
      toast.error('Не вдалося видалити історію');
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
        <Pagination 
          onClick={handleLoadMore}
          isLoading={isLoadingMore}
          isVisible={currentStories.length < stories.length}
          className={css.pagination_margin}
        />
      </div>
    </section>
  );
}