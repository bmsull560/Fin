import React, { useEffect, useState } from "react";
import { getArticles } from "@/lib/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import ArticleListHeader from "./ArticleListHeader";
import ArticleCard from "./ArticleCard";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: Date;
  isRead: boolean;
  feedTitle: string;
}

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
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    loadArticles();
  }, [selectedFeedId]);

  const loadArticles = async () => {
    try {
      const data = await getArticles(selectedFeedId);
      setArticles(
        data.map((article) => ({
          id: article.id,
          title: article.title,
          excerpt: article.excerpt || "",
          date: new Date(article.published_at || article.created_at),
          isRead: article.is_read,
          feedTitle: article.feed.title,
        })),
      );
    } catch (error) {
      console.error("Error loading articles:", error);
    }
  };

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
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              {...article}
              onClick={() => onArticleSelect(article.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ArticleList;
