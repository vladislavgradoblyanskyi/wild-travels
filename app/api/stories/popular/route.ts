import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { api } from '../../api';
import { logErrorResponse } from '../../_utils/utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const perPage = searchParams.get('perPage') || '6';

    const apiRes = await api.get('/stories', {
      params: { type: 'popular', perPage },
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          message:
            error.response?.data?.message ||
            'Не вдалося отримати популярні статті',
        },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
