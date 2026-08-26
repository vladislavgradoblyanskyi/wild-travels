import axios, { AxiosError } from 'axios';
import { nextServer } from './api';
import {
  CheckSessionRequest,
  LoginRequest,
  RegisterRequest,
} from '@/types/auth';
import { type TravellersResponse } from '@/types/traveller';
import type { Story } from '@/types/story';
import { User } from '@/types/user';

export const getMe = async (): Promise<User> => {
  try {
    const response = await nextServer.get<User>('/api/profile/me');
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {
      try {
        await nextServer.post('/api/auth/refresh');

        const retryResponse = await nextServer.get<User>('/api/profile/me');

        return retryResponse.data;
      } catch  {
        throw new Error('Сесія закінчилася. Увійдіть знову.');
      }
    }

    // Безпечно витягуємо повідомлення без any
    let message = 'Не вдалося завантажити профіль';

    if (
      axiosError.response?.data &&
      typeof axiosError.response.data === 'object'
    ) {
      const data = axiosError.response.data as Record<string, any>;
      message = data.message || data.error || message;
    } else if (axiosError.message) {
      message = axiosError.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    throw new Error(message);
  }
};

export const checkSession = async () => {
  const response = await nextServer.get<CheckSessionRequest>(
    '/api/auth/refresh',
  );
  return response.data.success;
};

export async function userLogin(data: LoginRequest) {
  try {
    const response = await nextServer.post('/api/auth/login', data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (
        error.code === 'ECONNREFUSED' ||
        error.message?.includes('Network Error') ||
        !error.response
      ) {
        throw new Error('Сервер недоступний. Перевірте, чи запущений бекенд.');
      }
      const serverMessage = error.response?.data?.message || error.message;
      throw new Error(serverMessage || 'Невірні дані для входу');
    }
    if (error instanceof Error) {
      throw error;
    }
  }

  throw new Error('Щось пішло не так. Спробуйте пізніше.');
}

export async function userRegister(data: RegisterRequest) {
  try {
    const response = await nextServer.post('/api/auth/register', data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (
        error.code === 'ECONNREFUSED' ||
        error.message?.includes('Network Error') ||
        !error.response
      ) {
        throw new Error('Сервер недоступний. Перевірте, чи запущений бекенд.');
      }
      const serverMessage = error.response?.data?.message || error.message;
      throw new Error(serverMessage || 'Помилка реєстрації');
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Щось пішло не так при реєстрації');
  }
}

export const logout = async (): Promise<void> => {
  await nextServer.post('/api/auth/logout');
};

export async function getTravellers(page: number): Promise<TravellersResponse> {
  try {
    const response = await nextServer.get<TravellersResponse>(
      `/api/travellers?page=${page}&perPage=12`,
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Щось пішло не так при отриманні даних про мандрівників');
  }
}

export type PopularStoriesResponse = {
  data: Story[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

export async function getPopularStories(
  perPage = 6,
): Promise<PopularStoriesResponse> {
  try {
    const response = await nextServer.get<PopularStoriesResponse>(
      '/api/stories/popular',
      { params: { perPage } },
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Щось пішло не так при отриманні популярних статей');
  }
}

export type SaveStoryResponse = {
  message: string;
  savedArticles: string[];
  savedCount?: number;
};

export async function saveStory(storyId: string): Promise<SaveStoryResponse> {
  try {
    const response = await nextServer.post<SaveStoryResponse>(
      `/api/stories/${storyId}/save`,
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const serverMessage = error.response?.data?.message || error.message;
      throw new Error(serverMessage || 'Не вдалося зберегти статтю');
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Щось пішло не так. Спробуйте пізніше.');
  }
}

export async function unsaveStory(storyId: string): Promise<SaveStoryResponse> {
  try {
    const response = await nextServer.delete<SaveStoryResponse>(
      `/api/stories/${storyId}/save`,
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const serverMessage = error.response?.data?.message || error.message;
      throw new Error(
        serverMessage || 'Не вдалося прибрати статтю зі збереженого',
      );
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Щось пішло не так. Спробуйте пізніше.');
  }
}
