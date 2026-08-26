export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';
import { cookies } from 'next/headers';

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const incoming = await req.formData();

    const file = incoming.get('avatarUrl');

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          message: 'Avatar file is required',
        },
        {
          status: 400,
        },
      );
    }

    const formData = new FormData();

    formData.append(
      'avatarUrl',
      file,
      file.name,
    );

    const response = await api.patch(
      '/profile/avatar',
      formData,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    return NextResponse.json(response.data);

  } catch (error: any) {
    console.error(
      '[Avatar Upload Error]',
      error.response?.data || error.message,
    );

    return NextResponse.json(
      {
        message:
          error.response?.data?.message ||
          error.message ||
          'Avatar upload failed',
      },
      {
        status: error.response?.status || 500,
      },
    );
  }
}