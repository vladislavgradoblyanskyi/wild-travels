import { AxiosError } from 'axios';
import { nextServer } from './api';
import {
  CheckSessionRequest,
  LoginRequest,
  RegisterRequest,
} from '@/types/auth';

export function getMe() {}
export const checkSession = async () => {
  const response =
    await nextServer.get<CheckSessionRequest>('/api/auth/refresh');
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
