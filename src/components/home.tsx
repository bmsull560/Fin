import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
    // Reset article selection when changing feeds
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
    <div className="w-screen h-screen bg-background">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <Sidebar
            selectedFeedId={selectedFeedId}
            onFeedSelect={handleFeedSelect}
            onFeedSettings={handleFeedSettings}
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
          <ArticleList
            selectedArticleId={selectedArticleId}
            onArticleSelect={handleArticleSelect}
          />
        </ResizablePanel>

        <ResizableHandle />

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
    </div>
  );
};

export default Home;
