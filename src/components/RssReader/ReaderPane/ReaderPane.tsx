import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReaderHeader from "./ReaderHeader";
import ArticleContent from "./ArticleContent";

interface Article {
  id: string;
  title: string;
  author: string;
  date: Date;
  content: string;
  feedTitle: string;
}

interface ReaderPaneProps {
  article?: Article;
  isDarkMode?: boolean;
  fontSize?: "small" | "medium" | "large";
  onThemeToggle?: () => void;
  onFontSizeChange?: (size: "small" | "medium" | "large") => void;
  onShare?: () => void;
  onBookmark?: () => void;
}

const ReaderPane = ({
  article = {
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
  },
  isDarkMode = false,
  fontSize = "medium",
  onThemeToggle = () => {},
  onFontSizeChange = () => {},
  onShare = () => {},
  onBookmark = () => {},
}: ReaderPaneProps) => {
  return (
    <div className="w-[852px] h-[982px] bg-background border-l flex flex-col">
      <ReaderHeader
        title={article.title}
        feedTitle={article.feedTitle}
        isDarkMode={isDarkMode}
        fontSize={fontSize}
        onThemeToggle={onThemeToggle}
        onFontSizeChange={onFontSizeChange}
        onShare={onShare}
        onBookmark={onBookmark}
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
