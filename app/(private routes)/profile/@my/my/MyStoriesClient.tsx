'use client'
import { Story } from '@/types/story';
import css from './MyStoriesClient.module.css';
import TravellerStoriesList from '@/components/TravellerPage/TravellerStoriesList/TravellerStoriesList'
import Link from 'next/link';

interface Props {
stories:Story[]
}
export default function MyStoriesClient({stories}:Props){
    
    
    return (
  <>
    {stories && stories.length > 0 ? (<TravellerStoriesList stories={stories}/>) : (
      <>
        <div className={css.null_stories_div}>
          <h2>
            Ви ще нічого не публікували, поділіться своєю першою історією!
          </h2>
          <Link href={'/new-story'} className={css.stories_link}>Опублікувати історію</Link>
        </div>
      </>
    )}
  </>
);
    
}
