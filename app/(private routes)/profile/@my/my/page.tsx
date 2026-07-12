import { GetOwnStoriesServer } from '@/lib/api/serverApi';
import MyStoriesClient from './MyStoriesClient';

export default async function MyStoriesPage() {
  const stories = await GetOwnStoriesServer();

  return (
    <MyStoriesClient stories={stories.stories} />
  );
}