import { nextServer } from './api';
import { cookies } from 'next/headers';
import { CheckSessionRequest } from '@/types/auth';
import { User } from '@/types/user';
import { Story } from '@/types/story';
import {enrichStoriesWithOwners} from './storyApi'
export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionRequest>('/api/auth/refresh', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const GetMeServer = async (): Promise<User> => {
  const cookieStore = await cookies();
  const {data} = await nextServer.get('/api/profile/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};


export const GetUserById = async(id: string): Promise<User> =>{
  const {data} = await nextServer.get(`/api/travellers/${id}`);
  return data;
}

interface OwnStories{
page:number;
perPage:number;
totalItems:number;
totalPages:number;  
stories:Story[]
}


export const GetOwnStoriesServer = async ():Promise<OwnStories> => {
  const cookieStore = await cookies();
  const {data} = await nextServer.get('/api/profile/own', {
      params: {
        page: 1,
        perPage: 6,
      },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  const enrichedStories = await enrichStoriesWithOwners(data.stories);
    return {
    ...data,
    data: enrichedStories,
  };
};

export const GetSavedStoriesServer = async(page:number,perPage:number) =>{
  const cookieStore = await cookies();
  const {data} = await nextServer.get('/api/profile/saved-stories', {
      params: {
        page,
        perPage,
      },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
    const enrichedStories = await enrichStoriesWithOwners(data.data);
    return {
    ...data,
    data: enrichedStories,
  };
}
