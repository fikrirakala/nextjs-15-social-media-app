"use client";

import React from "react";
import Post from "@/components/posts/Post";
import { PostData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function ForYouFeed() {
  const { data, isPending, isError } = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: async () => {
      const response = await fetch("/api/posts/for-you-feed");

      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }

      return response.json();
    },
  });

  if (isPending) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (isError) {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {data.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
