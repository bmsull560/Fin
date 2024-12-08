import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ArticleListHeader from "./ArticleListHeader";
import ArticleCard from "./ArticleCard";
import { useArticles, Article } from "@/lib/hooks/use-articles";

interface ArticleListProps {
  selectedFeedId?: string;
  selectedArticleId?: string;
  onArticleSelect?: (articleId: string) => void;
  sortOrder?: "asc" | "desc";
  viewMode?: "grid" | "list";
  onSortOrderChange?: (order: "asc" | "desc") => void;
  onViewModeChange?: (mode: "grid" | "list") => void;
}

const ArticleList = ({
  selectedFeedId,
  selectedArticleId = "",
  onArticleSelect = () => {},
  sortOrder = "desc",
  viewMode = "list",
  onSortOrderChange = () => {},
  onViewModeChange = () => {},
}: ArticleListProps) => {
  const { articles, isLoading } = useArticles(selectedFeedId);

  const sortedArticles = React.useMemo(() => {
    if (!articles) return [];

    return [...articles].sort((a, b) => {
      const dateA = new Date(a.published_at || a.created_at);
      const dateB = new Date(b.published_at || b.created_at);
      return sortOrder === "desc"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });
  }, [articles, sortOrder]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <ArticleListHeader
        sortOrder={sortOrder}
        viewMode={viewMode}
        onSortOrderChange={onSortOrderChange}
        onViewModeChange={onViewModeChange}
      />

      <ScrollArea className="flex-1">
        <div
          className={`p-4 space-y-4 ${viewMode === "grid" ? "grid grid-cols-1 gap-4" : "flex flex-col gap-4"}`}
        >
          {sortedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              excerpt={article.excerpt || ""}
              date={new Date(article.published_at || article.created_at)}
              isRead={article.is_read}
              feedTitle={article.feed?.title || "Unknown Feed"}
              onClick={() => onArticleSelect(article.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ArticleList;
