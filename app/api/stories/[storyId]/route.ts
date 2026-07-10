import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ storyId: string }> }
) {
  const { storyId } = await params;

  const response = await fetch(
    `${API_URL}/api/stories/${storyId}`,
    {
      headers: {
        Cookie: request.headers.get("cookie") ?? "",
      },
    }
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}