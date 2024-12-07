import React from "react";
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
  articles?: Article[];
  selectedArticleId?: string;
  onArticleSelect?: (articleId: string) => void;
  sortOrder?: "asc" | "desc";
  viewMode?: "grid" | "list";
  onSortOrderChange?: (order: "asc" | "desc") => void;
  onViewModeChange?: (mode: "grid" | "list") => void;
}

const ArticleList = ({
  articles = [
    {
      id: "1",
      title: "The Future of AI in 2024",
      excerpt:
        "Exploring the latest developments in artificial intelligence and what they mean for the tech industry...",
      date: new Date(),
      isRead: false,
      feedTitle: "TechCrunch",
    },
    {
      id: "2",
      title: "New Breakthrough in Quantum Computing",
      excerpt:
        "Scientists have achieved a major milestone in quantum computing with implications for cryptography...",
      date: new Date(Date.now() - 86400000),
      isRead: true,
      feedTitle: "The Verge",
    },
    {
      id: "3",
      title: "Global Markets Update",
      excerpt:
        "Markets show resilience amid economic uncertainties as tech stocks continue to perform well...",
      date: new Date(Date.now() - 172800000),
      isRead: false,
      feedTitle: "Reuters",
    },
  ],
  selectedArticleId = "",
  onArticleSelect = () => {},
  sortOrder = "desc",
  viewMode = "list",
  onSortOrderChange = () => {},
  onViewModeChange = () => {},
}: ArticleListProps) => {
  return (
    <div className="w-[380px] h-[982px] bg-background border-r flex flex-col">
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
              id={article.id}
              title={article.title}
              excerpt={article.excerpt}
              date={article.date}
              isRead={article.isRead}
              feedTitle={article.feedTitle}
              onClick={() => onArticleSelect(article.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ArticleList;
