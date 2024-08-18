import kyInstance from "@/lib/ky";
import { CommentsPage, PostData } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import CommentInput from "./CommentInput";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Comment from "./Comment";

interface CommentsProps {
  post: PostData;
}

export default function Comments({ post }: CommentsProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
    isError,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["comments", post.id],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          `/api/posts/${post.id}/comments`,
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<CommentsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (firstPage) => firstPage.previousCursor,
    select(data) {
      return {
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      };
    },
  });

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  return (
    <div className="space-y-3">
      <CommentInput post={post} />

      {hasNextPage && (
        <Button
          variant="link"
          className="mx-auto block"
          disabled={isFetching}
          onClick={() => fetchNextPage()}
        >
          Load previous comment
        </Button>
      )}

      {isPending && <Loader2 className="mx-auto animate-spin" />}

      {isSuccess && !comments.length && (
        <p className="text-center text-muted-foreground">No comments yet.</p>
      )}

      {isError && (
        <p className="text-center text-destructive">
          An error occurred while loading comments.
        </p>
      )}

      <div className="divide-y">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}
