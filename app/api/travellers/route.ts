import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api/api';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '12';
    const url = `/users/?page=${page}&perPage=${perPage}`;

    const apiRes = await api.get(url);

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error: unknown) {
    console.error('Proxy Error:', (error as Error).message);
    
    return NextResponse.json(
      { message: (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Помилка сервера' },
      { status: (error as { response?: { status?: number } }).response?.status || 500 }
    );
  }
}