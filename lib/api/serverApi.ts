import { nextServer } from './api';
import { cookies } from 'next/headers';
import { CheckSessionRequest } from '@/types/auth';

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionRequest>('/api/auth/refresh', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};
