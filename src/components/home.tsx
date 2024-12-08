import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Rss, ListStart, Settings2 } from "lucide-react";
import Sidebar from "./RssReader/Sidebar/Sidebar";
import ArticleList from "./RssReader/ArticleList/ArticleList";
import ReaderPane from "./RssReader/ReaderPane/ReaderPane";

const Home = () => {
  const [selectedFeedId, setSelectedFeedId] = React.useState("");
  const [selectedArticleId, setSelectedArticleId] = React.useState("");
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [fontSize, setFontSize] = React.useState<"small" | "medium" | "large">(
    "medium",
  );

  const handleFeedSelect = (feedId: string) => {
    setSelectedFeedId(feedId);
    setSelectedArticleId("");
  };

  const handleFeedSettings = (feedId: string) => {
    console.log("Opening settings for feed:", feedId);
  };

  const handleArticleSelect = (articleId: string) => {
    setSelectedArticleId(articleId);
  };

  const handleShare = () => {
    console.log("Sharing article");
  };

  const handleBookmark = () => {
    console.log("Bookmarking article");
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-background">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-full rounded-lg border"
      >
        {/* Sidebar Panel */}
        <ResizablePanel
          defaultSize={20}
          minSize={15}
          maxSize={30}
          className="hidden md:block"
        >
          <Sidebar
            selectedFeedId={selectedFeedId}
            onFeedSelect={handleFeedSelect}
            onFeedSettings={handleFeedSettings}
          />
        </ResizablePanel>

        <ResizableHandle />

        {/* Article List Panel */}
        <ResizablePanel
          defaultSize={30}
          minSize={20}
          maxSize={40}
          className="hidden md:block"
        >
          <ArticleList
            selectedArticleId={selectedArticleId}
            onArticleSelect={handleArticleSelect}
            selectedFeedId={selectedFeedId}
          />
        </ResizablePanel>

        <ResizableHandle className="hidden md:block" />

        {/* Reader Panel - Full width on mobile */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <ReaderPane
            isDarkMode={isDarkMode}
            fontSize={fontSize}
            onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            onFontSizeChange={setFontSize}
            onShare={handleShare}
            onBookmark={handleBookmark}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background p-2 flex justify-around">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => console.log("Show feeds")}
        >
          <Rss className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => console.log("Show articles")}
        >
          <ListStart className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => console.log("Show settings")}
        >
          <Settings2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Home;
