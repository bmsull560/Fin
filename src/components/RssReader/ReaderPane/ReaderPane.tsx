import React, { useEffect } from "react";
import { useArticles } from "@/lib/hooks/use-articles";
import ReaderHeader from "./ReaderHeader";
import ArticleContent from "./ArticleContent";

interface ReaderPaneProps {
  selectedArticleId?: string;
  isDarkMode?: boolean;
  fontSize?: "small" | "medium" | "large";
  onThemeToggle?: () => void;
  onFontSizeChange?: (size: "small" | "medium" | "large") => void;
  onBookmark?: () => void;
}

const ReaderPane = ({
  selectedArticleId,
  isDarkMode = false,
  fontSize = "medium",
  onThemeToggle = () => {},
  onFontSizeChange = () => {},
  onBookmark = () => {},
}: ReaderPaneProps) => {
  const { articles, markAsRead, toggleBookmark } = useArticles();

  const selectedArticle = React.useMemo(() => {
    if (!selectedArticleId || !articles) return null;
    return articles.find((article) => article.id === selectedArticleId);
  }, [selectedArticleId, articles]);

  useEffect(() => {
    if (selectedArticleId) {
      markAsRead.mutate(selectedArticleId);
    }
  }, [selectedArticleId, markAsRead]);

  const handleBookmark = async () => {
    if (selectedArticleId && selectedArticle) {
      await toggleBookmark.mutateAsync({
        articleId: selectedArticleId,
        isBookmarked: selectedArticle.is_bookmarked || false,
      });
      onBookmark();
    }
  };

  if (!selectedArticle) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Select an article to read
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <ReaderHeader
        title={selectedArticle.title}
        feedTitle={selectedArticle.feed?.title || "Unknown Feed"}
        isDarkMode={isDarkMode}
        fontSize={fontSize}
        onThemeToggle={onThemeToggle}
        onFontSizeChange={onFontSizeChange}
        onBookmark={handleBookmark}
      />

      <div className="flex-1 overflow-hidden">
        <ArticleContent
          title={selectedArticle.title}
          author={selectedArticle.author || "Unknown Author"}
          date={
            new Date(selectedArticle.published_at || selectedArticle.created_at)
          }
          content={selectedArticle.content || ""}
          feedTitle={selectedArticle.feed?.title || "Unknown Feed"}
          fontSize={fontSize}
        />
      </div>
    </div>
  );
};

export default ReaderPane;
