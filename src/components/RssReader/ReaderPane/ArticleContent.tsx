import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface ArticleContentProps {
  title?: string;
  author?: string;
  date?: Date;
  content?: string;
  feedTitle?: string;
  fontSize?: "small" | "medium" | "large";
}

const ArticleContent = ({
  title = "Sample Article Title",
  author = "John Doe",
  date = new Date(),
  content = `<div>
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
  feedTitle = "Sample Feed",
  fontSize = "medium",
}: ArticleContentProps) => {
  const getFontSize = () => {
    switch (fontSize) {
      case "small":
        return "text-sm";
      case "large":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  return (
    <div className="w-[720px] bg-background mx-auto">
      <ScrollArea className="h-full">
        <Card className="border-0 shadow-none">
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="mb-2">
                {feedTitle}
              </Badge>
              <h1 className="text-2xl font-bold">{title}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{author}</span>
                <span>•</span>
                <time>{formatDistanceToNow(date, { addSuffix: true })}</time>
              </div>
            </div>

            <div
              className={`prose prose-stone dark:prose-invert max-w-none ${getFontSize()}`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </Card>
      </ScrollArea>
    </div>
  );
};

export default ArticleContent;
