'use client'
import StoriesList from '@/components/ProfilePage/StoriesList/StoriesList'
import { Story } from "@/types/story"
import Link from 'next/link';
import css from './SavedStoriesClient.module.css'

interface Props{
savedStories:Story[]
}
export default function SavedStoriesClient({savedStories}:Props){
    console.log(savedStories);
        return (
      <>
        {savedStories && savedStories.length > 0 ? (<StoriesList stories={savedStories}/>) : (
          <>
            <div className={css.null_stories_div}>
              <h2 className={css.text}>
                У вас ще немає збережених історій, мершій збережіть вашу першу історію!
              </h2>
              <Link href={'/stories'} className={css.stories_link}>До історій</Link>
            </div>
          </>
        )}
      </>
        )
}