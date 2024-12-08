import React, { useEffect } from "react";
import { useArticles } from "@/lib/hooks/use-articles";
import ReaderHeader from "./ReaderHeader";
import ArticleContent from "./ArticleContent";

interface Article {
  id: string;
  title: string;
  author: string;
  date: Date;
  content: string;
  feedTitle: string;
  is_bookmarked?: boolean;
}

interface ReaderPaneProps {
  selectedArticleId?: string;
  isDarkMode?: boolean;
  fontSize?: "small" | "medium" | "large";
  onThemeToggle?: () => void;
  onFontSizeChange?: (size: "small" | "medium" | "large") => void;
}

const ReaderPane = ({
  selectedArticleId,
  isDarkMode = false,
  fontSize = "medium",
  onThemeToggle = () => {},
  onFontSizeChange = () => {},
}: ReaderPaneProps) => {
  const { markAsRead, toggleBookmark } = useArticles();

  // Mock article for design view
  const article = {
    id: "1",
    title: "The Future of Technology",
    author: "John Doe",
    date: new Date(),
    content: `<div>
      <p>This is a sample article content with multiple paragraphs to demonstrate the layout and styling of the reader pane.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <img src="https://dummyimage.com/800x400/e0e0e0/666666&text=Article+Image" alt="Sample article image" />
      <h2>Section Heading</h2>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <ul>
        <li>List item one with some example text</li>
        <li>List item two with additional content</li>
        <li>List item three demonstrating bullet points</li>
      </ul>
      <blockquote>This is a sample blockquote that might appear in the article content.</blockquote>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    </div>`,
    feedTitle: "Tech Insights",
    is_bookmarked: false,
  };

  useEffect(() => {
    if (selectedArticleId) {
      markAsRead.mutate(selectedArticleId);
    }
  }, [selectedArticleId]);

  const handleBookmark = async () => {
    if (selectedArticleId) {
      await toggleBookmark.mutateAsync({
        articleId: selectedArticleId,
        isBookmarked: article.is_bookmarked || false,
      });
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <ReaderHeader
        title={article.title}
        feedTitle={article.feedTitle}
        isDarkMode={isDarkMode}
        fontSize={fontSize}
        onThemeToggle={onThemeToggle}
        onFontSizeChange={onFontSizeChange}
        onBookmark={handleBookmark}
      />

      <div className="flex-1 overflow-hidden">
        <ArticleContent
          title={article.title}
          author={article.author}
          date={article.date}
          content={article.content}
          feedTitle={article.feedTitle}
          fontSize={fontSize}
        />
      </div>
    </div>
  );
};

export default ReaderPane;
