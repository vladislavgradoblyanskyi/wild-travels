import { GetOwnStoriesServer } from '@/lib/api/serverApi';
import MyStoriesClient from './MyStoriesClient';

export default async function MyStoriesPage() {
  const res = await GetOwnStoriesServer();
  

  return (
    <MyStoriesClient res={res}/>
  );
}