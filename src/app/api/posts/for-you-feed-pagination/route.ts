import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const pageSize = 10;

  const pageNumber = Number(request.nextUrl.searchParams.get("page"));

  try {
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const skip = (pageNumber - 1) * pageSize;

    const postsPromise = prisma.post.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: pageSize,
    });

    const countPromise = prisma.post.count();

    const [posts, totalPosts] = await Promise.all([postsPromise, countPromise]);

    const totalPage = Math.ceil(totalPosts / pageSize);

    return Response.json({ posts, hasMore: pageNumber < totalPage });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
