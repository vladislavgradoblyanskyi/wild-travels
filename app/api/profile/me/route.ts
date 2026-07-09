import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { AxiosError } from 'axios';

export async function GET() {
  try {
    const cookieStore = await cookies();

    const { data } = await api.get('/profile/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('[Proxy /profile/me] Full error:', error);

    let status = 500;
    let message = 'Не вдалося отримати профіль';

    if (error instanceof AxiosError) {
      status = error.response?.status || 500;
      message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    console.error(`[Proxy /profile/me] Status: ${status}, Message: ${message}`);

    return NextResponse.json(
      {
        error: message,
        status,
      },
      { status },
    );
  }
}
