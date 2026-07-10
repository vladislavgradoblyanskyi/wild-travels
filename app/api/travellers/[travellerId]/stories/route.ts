import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../../api'; 

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ travellerId: string }> }
) {
  try {
    const { travellerId } = await props.params;
    const { searchParams } = new URL(req.url);
    
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '6';

    const apiRes = await api.get(`/users/${travellerId}`);
    
    const user = apiRes.data.user;
    const allUserStories = apiRes.data.stories || [];
    
    const p = parseInt(page, 10);
    const pp = parseInt(perPage, 10);
    
    const slicedStories = allUserStories.slice((p - 1) * pp, p * pp);
    const totalPages = Math.ceil(allUserStories.length / pp);

    const enrichedStories = slicedStories.map((story: any) => ({
      ...story,
      ownerId: {
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl || user.avatar,
      },
      author: {
        name: user.name,
      }
    }));

    return NextResponse.json({
      data: enrichedStories,
      page: p,
      totalPages: totalPages
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Traveller stories proxy error:', (error as Error).message);
    return NextResponse.json(
      { message: 'Помилка сервера при отриманні історій мандрівника' },
      { status: 500 }
    );
  }
}