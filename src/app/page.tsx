import { Shell } from "@/components/shell";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sidebar } from "@/components/sidebar";
import { FeedView } from "@/components/feed-view";
import { ArticleView } from "@/components/article-view";

export default function HomePage() {
  return (
    <Shell>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <Sidebar />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={35} minSize={30} maxSize={45}>
          <FeedView />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={45}>
          <ArticleView />
        </ResizablePanel>
      </ResizablePanelGroup>
    </Shell>
  );
}
