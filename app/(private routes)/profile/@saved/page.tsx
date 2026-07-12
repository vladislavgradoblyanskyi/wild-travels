import { GetSavedStoriesServer } from "@/lib/api/serverApi";
import SavedStoriesClient from "./saved/SavedStoriesClient";



export default async function SavedStories() {
  const res = await GetSavedStoriesServer();  
  
  return (
    <SavedStoriesClient res={res}/>
  );
}