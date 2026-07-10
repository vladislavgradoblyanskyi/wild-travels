import { nextServer } from "./api";
import { AxiosError } from "axios";

import type {
  CategoriesResponse,
  Story,
  StoriesResponse,
} from "@/types/story";

type GetStoriesParams = {
  pageParam?: number;
  perPage?: number;
  category?: string;
};

type TravellerProfile = {
  _id: string;
  name: string;
  avatarUrl?: string;
};

type TravellerProfileResponse = {
  user?: TravellerProfile;
};

const ownerCache = new Map<string, TravellerProfile>();

async function getTravellerProfile(id: string) {
  if (ownerCache.has(id)) {
    return ownerCache.get(id);
  }

  const response =
    await nextServer.get<TravellerProfileResponse>(
      `/api/travellers/${id}`
    );

  const user = response.data.user;

  if (user) {
    ownerCache.set(id, user);
  }

  return user;
}

async function enrichStoriesWithOwners(
  stories: Story[]
): Promise<Story[]> {
  const ownerIds = Array.from(
    new Set(
      stories
        .map((story) =>
          typeof story.ownerId === "string"
            ? story.ownerId
            : story.ownerId?._id
        )
        .filter((id): id is string => Boolean(id))
    )
  );

  const owners = await Promise.all(
    ownerIds.map((id) => getTravellerProfile(id))
  );

  const ownersMap = new Map(
    owners
      .filter(
        (
          owner
        ): owner is TravellerProfile =>
          Boolean(owner?._id)
      )
      .map((owner) => [owner._id, owner] as const)
  );

  return stories.map((story) => {
    const ownerId =
      typeof story.ownerId === "string"
        ? story.ownerId
        : story.ownerId?._id;

    const owner = ownerId
      ? ownersMap.get(ownerId)
      : undefined;

    if (!owner) {
      return story;
    }

    return {
      ...story,
      ownerId: owner,
      author: {
        name: owner.name,
      },
    };
  });
}

export const getStories = async ({
  pageParam = 1,
  perPage = 9,
  category,
}: GetStoriesParams = {}): Promise<StoriesResponse> => {
  const response =
    await nextServer.get<StoriesResponse>(
      "/api/stories",
      {
        params: {
          page: pageParam,
          perPage,
          ...(category ? { category } : {}),
        },
      }
    );

    console.log("=== STORIES FROM API ===");
  response.data.data.forEach((story: Story) => {
    console.log({
      id: story._id,
      title: story.title,
      isSaved: story.isSaved,
      savedCount: story.savedCount,
    });
  });

  const enrichedStories = await enrichStoriesWithOwners(
    response.data.data
  );

  return {
    ...response.data,
    data: enrichedStories,
  };
};

export const getCategories = async (): Promise<CategoriesResponse> => {
  const response = await nextServer.get(
    "/api/categories"
  );

  return response.data;
};


export const getStoryById = async (id: string) => {
  const response = await nextServer.get(`/api/stories/${id}`);

  console.log("FULL STORY RESPONSE:", response.data);

  const story = response.data.story ?? response.data;

  const [enrichedStory] = await enrichStoriesWithOwners([story]);

  const categoriesResponse = await getCategories();

  const categoryId =
    typeof enrichedStory.category === "string"
      ? enrichedStory.category
      : enrichedStory.category._id;

  const category = categoriesResponse.data.find(
    (item) => item._id === categoryId
  );

  return {
    ...response.data,
    story: {
      ...enrichedStory,
      category: category ?? enrichedStory.category,
    },
  };
};

export const getRecommendedStories = async (
  story: Story
): Promise<Story[]> => {

  const categoryId =
    typeof story.category === "string"
      ? story.category
      : story.category._id;


  const response = await getStories({
    pageParam: 1,
    perPage: 4,
    category: categoryId,
  });


return response.data
  .filter(
    (item) => item._id !== story._id
  )
  .slice(0, 3)
  .map((item) => ({
    ...item,
    isSaved: item.isSaved ?? false,
  }));
};

// export const addSavedArticle = async (storyId: string) => {
//   const { data } = await nextServer.post(
//     `/api/profile/savedArticles/${storyId}`
//   );

//   return data;
// };

export const addSavedArticle = async (storyId: string) => {
  try {
    const { data } = await nextServer.post(
      `/api/profile/savedArticles/${storyId}`
    );

    return data;
  } catch (error) {
    const err = error as AxiosError;

    console.log("STATUS:", err.response?.status);
    console.log("RESPONSE:", err.response?.data);

    throw error;
  }
};

export const removeSavedArticle = async (storyId: string) => {
  const { data } = await nextServer.delete(
    `/api/profile/savedArticles/${storyId}`
  );

  return data;
};