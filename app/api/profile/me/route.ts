<<<<<<< HEAD
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { logErrorResponse } from '../../_utils/utils';
import { isAxiosError } from 'axios';
=======
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { AxiosError } from 'axios';
>>>>>>> 54c2abfed6e39786ec28318fc00d205be7bb9bd8

export async function GET() {
  try {
    const cookieStore = await cookies();

<<<<<<< HEAD
    const res = await api.get('/profile/me', {
=======
    const { data } = await api.get('/profile/me', {
>>>>>>> 54c2abfed6e39786ec28318fc00d205be7bb9bd8
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
<<<<<<< HEAD
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
=======

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
>>>>>>> 54c2abfed6e39786ec28318fc00d205be7bb9bd8
