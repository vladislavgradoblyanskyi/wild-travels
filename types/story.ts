export type Story = {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: string;
  date: string;
  ownerId: string;
  author: {
    name: string;
  };
  savedCount: number;
  isSaved: boolean;
};

export type StoryResponse = {
  story: Story;
  recommendedStories: Story[];
};