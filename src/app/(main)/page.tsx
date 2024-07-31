import PostEditor from "@/components/posts/editor/PostEditor";
import TrendsSidebar from "@/components/TrendsSidebar";
// import ForYouFeed from "./ForYouFeed";
import InfiniteForYouFeed from "./InfiniteForYouFeed";

export default function HomePage() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <InfiniteForYouFeed />
      </div>
      <TrendsSidebar />
    </main>
  );
}
