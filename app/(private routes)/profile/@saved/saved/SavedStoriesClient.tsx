'use client'
import StoriesList from '@/components/ProfilePage/StoriesList/StoriesList'
import { StoriesResponse } from "@/types/story"
import Link from 'next/link';
import css from './SavedStoriesClient.module.css'

interface Props { 
res: StoriesResponse;
}
export default function SavedStoriesClient({res}: Props){
  
        return (
      <>
        {res.data && res.data.length > 0 ? (<StoriesList stories={res.data}/>) : (
            <div className={css.null_stories_div}>
              <h2 className={css.text}>
                У вас ще немає збережених історій, мершій збережіть вашу першу історію!
              </h2>
              <Link href={'/stories'} className={css.stories_link}>До історій</Link>
            </div>
        )}
      </>
        )
}