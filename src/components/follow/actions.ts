"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function addFollower(userId: string) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) throw new Error("Unauthorized");

  await prisma.follow.upsert({
    where: {
      followerId_followingId: {
        followerId: loggedInUser.id,
        followingId: userId,
      },
    },
    create: {
      followerId: loggedInUser.id,
      followingId: userId,
    },
    update: {},
  });
}

export async function deleteFollower(userId: string) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.follow.deleteMany({
    where: {
      followerId: loggedInUser.id,
      followingId: userId,
    },
  });
}
