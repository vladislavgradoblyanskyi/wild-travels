import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ storyId: string }> }
) {
    const { storyId } = await params;
    
   const cookieHeader = request.headers.get("cookie");

console.log("COOKIE HEADER RAW:");
console.log(cookieHeader);

console.log("HAS accessToken:", cookieHeader?.includes("accessToken"));
console.log("HAS refreshToken:", cookieHeader?.includes("refreshToken"));
console.log("HAS sessionId:", cookieHeader?.includes("sessionId"));

  const response = await fetch(
    `${API_URL}/api/users/savedArticles/${storyId}`,
    {
      method: "POST",
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ storyId: string }> }
) {
  const { storyId } = await params;

  const response = await fetch(
    `${API_URL}/api/users/savedArticles/${storyId}`,
    {
      method: "DELETE",
      headers: {
        Cookie: request.headers.get("cookie") ?? "",
      },
    }
  );

const text = await response.text();

console.log("STATUS:", response.status);
console.log("BODY:", text);

if (!response.ok) {
  return NextResponse.json(
    { error: text },
    { status: response.status }
  );
}

return NextResponse.json(JSON.parse(text));
}