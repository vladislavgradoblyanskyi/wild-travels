import { nextServer } from "./api";
import type { StoryResponse } from "../../types/story";

export const getStoryById = async (
  id: string
): Promise<StoryResponse> => {
  const response = await nextServer.get(`/stories/${id}`);
  return response.data;
};

export const addSavedArticle = async (articleId: string) => {
  const response = await nextServer.post(
    `/users/savedArticles/${articleId}`
  );

  return response.data;
};

export const removeSavedArticle = async (articleId: string) => {
  const response = await nextServer.delete(
    `/users/savedArticles/${articleId}`
  );

  return response.data;
};