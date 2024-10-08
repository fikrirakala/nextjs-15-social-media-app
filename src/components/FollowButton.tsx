"use client";

import { FollowerInfo } from "@/lib/types";
import React from "react";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import useFollowerInfo from "@/hooks/useFollowerInfo";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import kyInstance from "@/lib/ky";

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowButton({
  userId,
  initialState,
}: FollowButtonProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { data } = useFollowerInfo(userId, initialState);

  const queryKey: QueryKey = ["follower-info", userId];

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isFollowedByUser
        ? kyInstance.delete(`/api/users/${userId}/followers`)
        : kyInstance.post(`/api/users/${userId}/followers`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey, () => {
        return {
          followers:
            (previousState?.followers || 0) +
            (previousState?.isFollowedByUser ? -1 : 1),
          isFollowedByUser: !previousState?.isFollowedByUser,
        };
      });

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);

      toast({
        variant: "destructive",
        description: error.message,
      });
    },
  });

  return (
    <Button
      variant={data.isFollowedByUser ? "secondary" : "default"}
      onClick={() => mutate()}
    >
      {data.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  );
}
