import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '6';
    const category = searchParams.get('category');

    const apiRes = await api.get('stories/recommended', {
      params: { page, limit, category },
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      const status = error.response?.status || 400;
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Помилка при отриманні рекомендованих історій';

      return NextResponse.json({ message: serverMessage }, { status });
    }

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
