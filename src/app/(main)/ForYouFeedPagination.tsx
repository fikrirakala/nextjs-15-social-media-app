"use client";

import React, { useState } from "react";
import Post from "@/components/posts/Post";
import { PostData } from "@/lib/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

async function fetchPosts(page: number) {
  const response = await fetch(
    `/api/posts/for-you-feed-pagination?page=${page}`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  return response.json();
}

export default function ForYouFeedPagination() {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, isPlaceholderData, isFetching } = useQuery({
    queryKey: ["post-feed", page],
    queryFn: () => fetchPosts(page),
    placeholderData: keepPreviousData,
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
    <div>
      <div className="space-y-5">
        {data?.posts.map((post: PostData) => (
          <Post post={post} key={post.id} />
        ))}
      </div>

      <div className="mt-5 flex gap-5">
        <Button
          disabled={page === 1}
          onClick={() => setPage((oldPage) => oldPage - 1)}
        >
          Previous
        </Button>

        <Button
          onClick={() => {
            if (!isPlaceholderData && data.hasMore) {
              setPage((old) => old + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={isPlaceholderData || !data?.hasMore}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
