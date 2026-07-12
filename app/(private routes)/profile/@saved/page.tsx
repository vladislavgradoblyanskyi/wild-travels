import { GetSavedStoriesServer } from "@/lib/api/serverApi";
import SavedStoriesClient from "./saved/SavedStoriesClient";



export default async function SavedStories() {
  const {data} = await GetSavedStoriesServer();
  
  return (
    <SavedStoriesClient savedStories={data} />
  );
}