import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface ArticleCardProps {
  id?: string;
  title?: string;
  excerpt?: string;
  date?: Date;
  isRead?: boolean;
  feedTitle?: string;
  onClick?: () => void;
}

const ArticleCard = ({
  id = "1",
  title = "Sample Article Title",
  excerpt = "This is a sample article excerpt that shows the first few lines of the article content...",
  date = new Date(),
  isRead = false,
  feedTitle = "Sample Feed",
  onClick = () => {},
}: ArticleCardProps) => {
  return (
    <Card
      className={`w-[360px] h-[120px] p-4 bg-background hover:bg-accent cursor-pointer transition-colors ${isRead ? "opacity-70" : ""}`}
      onClick={onClick}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3
            className={`text-sm font-semibold leading-tight line-clamp-2 ${isRead ? "text-muted-foreground" : ""}`}
          >
            {title}
          </h3>
          <Badge variant="secondary" className="shrink-0 text-xs">
            {feedTitle}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2">{excerpt}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(date, { addSuffix: true })}
          </span>
          {!isRead && <div className="h-2 w-2 rounded-full bg-primary" />}
        </div>
      </div>
    </Card>
  );
};

export default ArticleCard;
