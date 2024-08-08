"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Post from "@/components/posts/Post";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

export default function FollowingFeed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
    isSuccess,
    isError,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "following"],
    queryFn: async ({ pageParam }) => {
      const url = `/api/posts/following${pageParam ? "?cursor=" + pageParam : ""}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }

      return response.json();
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastpage) => lastpage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (isPending) {
    return <PostsLoadingSkeleton />;
  }

  if (isSuccess && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No posts found. Start following people to see their posts here.
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }
  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}

      {isFetchingNextPage && <Loader2 className="mx-auto my-5 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
