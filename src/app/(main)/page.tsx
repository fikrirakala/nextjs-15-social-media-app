import PostEditor from "@/components/posts/editor/PostEditor";
import TrendsSidebar from "@/components/TrendsSidebar";
import InfiniteForYouFeed from "./InfiniteForYouFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "./FollowingFeed";

export default function HomePage() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <Tabs defaultValue="for-you">
          <TabsList className="h-12 w-full gap-1 bg-card shadow-sm">
            <TabsTrigger
              value="for-you"
              className="h-full flex-1 hover:bg-background data-[state=active]:font-bold data-[state=active]:shadow-none"
            >
              For you
            </TabsTrigger>
            <TabsTrigger
              value="following"
              className="h-full flex-1 hover:bg-background data-[state=active]:font-bold data-[state=active]:shadow-none"
            >
              Following
            </TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <InfiniteForYouFeed />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </div>
      <TrendsSidebar />
    </main>
  );
}
