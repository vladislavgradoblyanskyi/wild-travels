import { nextServer } from "./api";
import type {
  CategoriesResponse,
  Story,
  StoryResponse,
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

  const enrichedStories = await enrichStoriesWithOwners(
    response.data.data
  );

  return {
    ...response.data,
    data: enrichedStories,
  };
};

export const getCategories = async (): Promise<CategoriesResponse> => {
  const response =
    await nextServer.get<CategoriesResponse>(
      "/api/categories"
    );

  return response.data;
};

export const getStoryById = async (id: string) => {
  const response = await nextServer.get(`/stories/${id}`);

  console.log("FROM API:", response.data);

  return response.data;
};