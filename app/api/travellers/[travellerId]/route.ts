import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api'; 

export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ travellerId: string }> }
) {
  try {
    const { travellerId } = await params;

    if (!travellerId) {
      return NextResponse.json({ message: 'ID мандрівника обовʼязковий' }, { status: 400 });
    }

    const apiRes = await api.get(`/users/${travellerId}`);

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error: unknown) {
    const err = error as { 
      message?: string; 
      response?: { data?: { message?: string }; status?: number } 
    };

    console.error(`Proxy Error для юзера:`, err.message);
    
    return NextResponse.json(
      { message: err.response?.data?.message || 'Помилка отримання даних з бекенду' },
      { status: err.response?.status || 500 }
    );
  }
}