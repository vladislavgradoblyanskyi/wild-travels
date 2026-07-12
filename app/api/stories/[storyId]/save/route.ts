import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { api } from '../../../api';
import { logErrorResponse } from '../../../_utils/utils';

async function proxySaveRequest(method: 'post' | 'delete', storyId: string) {
  const cookieStore = await cookies();

  return api.request({
    method,
    url: `/users/savedArticles/${storyId}`,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
}

function handleSaveError(error: unknown) {
  if (isAxiosError(error)) {
    logErrorResponse(error.response?.data);

    return NextResponse.json(
      {
        message: error.response?.data?.message || 'Не вдалося зберегти статтю',
      },
      { status: error.response?.status || 400 },
    );
  }

  return NextResponse.json(
    { message: 'Internal Server Error' },
    { status: 500 },
  );
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ storyId: string }> },
) {
  try {
    const { storyId } = await params;
    const apiRes = await proxySaveRequest('post', storyId);
    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    return handleSaveError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ storyId: string }> },
) {
  try {
    const { storyId } = await params;
    const apiRes = await proxySaveRequest('delete', storyId);
    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    return handleSaveError(error);
  }
}
