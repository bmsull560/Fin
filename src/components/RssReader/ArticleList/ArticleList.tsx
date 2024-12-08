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

// Mock data for design view or development
const MOCK_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Understanding RSS Feeds",
    excerpt: "A comprehensive guide to RSS feeds and how they work...",
    date: new Date(),
    isRead: false,
    feedTitle: "Tech Blog",
  },
  {
    id: "2",
    title: "The Future of Content Consumption",
    excerpt:
      "Exploring how RSS and other technologies shape our reading habits...",
    date: new Date(Date.now() - 86400000),
    isRead: true,
    feedTitle: "Digital Trends",
  },
  {
    id: "3",
    title: "RSS vs Social Media",
    excerpt:
      "Comparing traditional RSS feeds with modern social media platforms...",
    date: new Date(Date.now() - 172800000),
    isRead: false,
    feedTitle: "Tech Review",
  },
];

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
    // Use mock data in design view or development without API
    if (
      import.meta.env.SSR ||
      (import.meta.env.DEV && !import.meta.env.VITE_SUPABASE_URL)
    ) {
      setArticles(MOCK_ARTICLES);
      return;
    }

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
      // Fallback to mock data in development
      if (import.meta.env.DEV) {
        setArticles(MOCK_ARTICLES);
      }
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
