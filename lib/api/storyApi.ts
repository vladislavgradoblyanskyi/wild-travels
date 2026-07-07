import { nextServer } from "./api";
import type { StoryResponse } from "../../types/story";

export const getStoryById = async (
  id: string
): Promise<StoryResponse> => {
  const response = await nextServer.get(`/stories/${id}`);
  return response.data;
};