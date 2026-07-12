// app/api/profile/avatar/route.ts

export async function POST(req: Request) {
  return Response.json({
    message: 'Avatar upload endpoint',
  });
}