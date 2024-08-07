import { FollowerInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFollowerInfo(
  userId: string,
  initialState: FollowerInfo,
) {
  const query = useQuery<FollowerInfo>({
    queryKey: ["follower-info", userId],
    queryFn: async () => {
      const data = await fetch(`/api/users/${userId}/followers`);

      if (!data.ok) {
        throw new Error(`Request failed with status code ${data.status}`);
      }

      return data.json();
    },
    initialData: initialState,
    staleTime: Infinity,
  });

  return query;
}
