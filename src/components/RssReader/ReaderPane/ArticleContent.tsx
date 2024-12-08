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
  author = "Unknown Author",
  date = new Date(),
  content = "",
  feedTitle = "Unknown Feed",
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

  const sanitizeContent = (html: string) => {
    // Create a DOMParser instance
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Remove potentially dangerous elements and attributes
    const dangerous = ["script", "style", "iframe", "object", "embed", "form"];
    dangerous.forEach((tag) => {
      const elements = doc.getElementsByTagName(tag);
      while (elements.length > 0) {
        elements[0].parentNode?.removeChild(elements[0]);
      }
    });

    // Remove on* attributes
    const all = doc.getElementsByTagName("*");
    for (let i = 0; i < all.length; i++) {
      const attrs = all[i].attributes;
      for (let j = attrs.length - 1; j >= 0; j--) {
        const attr = attrs[j];
        if (attr.name.toLowerCase().startsWith("on")) {
          all[i].removeAttribute(attr.name);
        }
      }
    }

    return doc.body.innerHTML;
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
              dangerouslySetInnerHTML={{ __html: sanitizeContent(content) }}
            />
          </div>
        </Card>
      </ScrollArea>
    </div>
  );
};

export default ArticleContent;
