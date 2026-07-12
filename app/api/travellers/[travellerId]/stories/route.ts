import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../../api'; 
import type { Story } from '@/types/story'; 

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ travellerId: string }> }
) {
  try {
    const { travellerId } = await params;
    const { searchParams } = new URL(req.url);
    
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '6';

    const apiRes = await api.get(`/users/${travellerId}`);
    
    const user = apiRes.data.user;
    const allUserStories = (apiRes.data.stories || []) as Story[];
    
    const p = parseInt(page, 10);
    const pp = parseInt(perPage, 10);
    
    const slicedStories = allUserStories.slice((p - 1) * pp, p * pp);
    const totalPages = Math.ceil(allUserStories.length / pp);

    const enrichedStories = slicedStories.map((story) => ({
      ...story,
      ownerId: {
        _id: user._id as string,
        name: user.name as string,
        avatarUrl: (user.avatarUrl || user.avatar) as string,
      },
      author: {
        name: user.name as string,
      }
    }));

    return NextResponse.json({
      data: enrichedStories,
      page: p,
      totalPages: totalPages
    }, { status: 200 });

  } catch (error: unknown) {
    const err = error as { 
      message?: string; 
      response?: { data?: { message?: string }; status?: number } 
    };

    console.error('Traveller stories proxy error:', err.message);
    
    return NextResponse.json(
      { message: err.response?.data?.message || 'Помилка сервера при отриманні історій мандрівника' },
      { status: err.response?.status || 500 }
    );
  }
}