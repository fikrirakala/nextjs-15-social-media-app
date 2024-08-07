import { Prisma } from "@prisma/client";

export const userDataSelect: Prisma.UserSelect = {
  id: true,
  username: true,
  displayName: true,
  avatarUrl: true,
};

export const postDataInclude: Prisma.PostInclude = {
  user: {
    select: userDataSelect,
  },
};

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;

export interface PostsPage {
  posts: PostData[];
  nextCursor: string | null;
}

export interface FollowerInfo {
  followers: number;
  isFollowByUser: boolean;
}
