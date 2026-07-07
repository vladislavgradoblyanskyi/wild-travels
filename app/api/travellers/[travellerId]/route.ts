import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api'; 

export async function GET(req: NextRequest, props: any) {
  try {
    const resolvedParams = props.params ? await props.params : {};
    const { travellerId } = resolvedParams;

    if (!travellerId) {
      return NextResponse.json({ message: 'ID мандрівника обовʼязковий' }, { status: 400 });
    }

    const apiRes = await api.get(`/users/${travellerId}`);

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error: any) {
    console.error(`Proxy Error для юзера:`, error.message);
    
    return NextResponse.json(
      { message: error.response?.data?.message || 'Помилка отримання даних з бекенду' },
      { status: error.response?.status || 500 }
    );
  }
}