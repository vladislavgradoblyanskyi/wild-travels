export type StoryCategory = {
  _id: string;
  category: string;
};

export type StoryOwner =
  | string
  | {
      _id?: string;
      name?: string;
      avatarUrl?: string;
    };

export type Story = {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: string | StoryCategory;
  date: string;
  ownerId: StoryOwner;
  author?: {
    name: string;
  };
  rate?: number;
  savedCount: number;
  isSaved: boolean;
};

export type StoriesResponse = {
  data: Story[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

export type CategoriesResponse = {
  status: number;
  message: string;
  data: StoryCategory[];
};

export type StoryResponse = {
  story: Story;
  recommendedStories: Story[];
};
