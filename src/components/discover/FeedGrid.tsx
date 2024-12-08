import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/lib/database.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

type Feed = Database["public"]["Tables"]["feed_catalog"]["Row"];

interface FeedGridProps {
  feeds: Feed[];
  loading: boolean;
  onSelect: (feed: Feed) => void;
}

const FeedGrid = ({ feeds, loading, onSelect }: FeedGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {feeds.map((feed) => (
        <Card
          key={feed.id}
          className="p-4 cursor-pointer hover:bg-accent transition-colors"
          onClick={() => onSelect(feed)}
        >
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={feed.logo_url || ""} alt={feed.title} />
              <AvatarFallback>{feed.title[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-2 flex-1">
              <div className="space-y-1">
                <h3 className="font-semibold leading-none">{feed.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {feed.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{feed.category}</Badge>
                {feed.agency && <Badge variant="outline">{feed.agency}</Badge>}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default FeedGrid;
