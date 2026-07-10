import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const params = new URLSearchParams();

    const page = searchParams.get('page');
    const perPage = searchParams.get('perPage');
    const category = searchParams.get('category');

    if (page) params.set('page', page);
    if (perPage) params.set('perPage', perPage);
    if (category) params.set('category', category);

    const query = params.toString();
    const apiRes = await api.get(query ? `/stories?${query}` : '/stories');

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error: unknown) {
    console.error('Stories proxy error:', (error as Error).message);

    return NextResponse.json(
      {
        message:
          (error as { response?: { data?: { message?: string } } }).response
            ?.data?.message || 'Failed to fetch stories',
      },
      {
        status:
          (error as { response?: { status?: number } }).response?.status || 500,
      },
    );
  }
}
