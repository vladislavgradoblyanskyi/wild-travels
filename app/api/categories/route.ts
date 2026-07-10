import { NextResponse } from 'next/server';
import { api } from '../api';

export async function GET() {
  try {
    const apiRes = await api.get('/categories');

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error: unknown) {
    console.error('Categories proxy error:', (error as Error).message);

    return NextResponse.json(
      {
        message:
          (error as { response?: { data?: { message?: string } } }).response
            ?.data?.message || 'Failed to fetch categories',
      },
      {
        status:
          (error as { response?: { status?: number } }).response?.status || 500,
      },
    );
  }
}
