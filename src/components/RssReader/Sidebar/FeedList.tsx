import React from "react";
import { RefreshCw, Rss, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { refreshFeed } from "@/lib/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Feed {
  id: string;
  title: string;
  url: string;
  unreadCount?: number;
}

interface FeedFolder {
  id: string;
  name: string;
  feeds: Feed[];
}

interface FeedListProps {
  folders?: FeedFolder[];
  selectedFeedId?: string;
  onFeedSelect?: (feedId: string) => void;
  onFeedSettings?: (feedId: string) => void;
}

const FeedList = ({
  folders = [
    {
      id: "1",
      name: "Technology",
      feeds: [
        {
          id: "1",
          title: "TechCrunch",
          url: "https://techcrunch.com/feed",
          unreadCount: 5,
        },
        {
          id: "2",
          title: "The Verge",
          url: "https://www.theverge.com/rss/index.xml",
          unreadCount: 3,
        },
      ],
    },
    {
      id: "2",
      name: "News",
      feeds: [
        {
          id: "3",
          title: "BBC News",
          url: "http://feeds.bbci.co.uk/news/rss.xml",
          unreadCount: 10,
        },
        {
          id: "4",
          title: "Reuters",
          url: "http://feeds.reuters.com/reuters/topNews",
          unreadCount: 7,
        },
      ],
    },
  ],
  selectedFeedId = "",
  onFeedSelect = () => {},
  onFeedSettings = () => {},
}: FeedListProps) => {
  const [refreshingFeeds, setRefreshingFeeds] = React.useState<string[]>([]);

  const handleRefreshFeed = async (feedId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setRefreshingFeeds((prev) => [...prev, feedId]);
      await refreshFeed(feedId);
    } catch (error) {
      console.error("Error refreshing feed:", error);
    } finally {
      setRefreshingFeeds((prev) => prev.filter((id) => id !== feedId));
    }
  };

  return (
    <ScrollArea className="h-full">
      <Accordion
        type="multiple"
        defaultValue={folders.map((f) => f.id)}
        className="p-2"
      >
        {folders.map((folder) => (
          <AccordionItem key={folder.id} value={folder.id}>
            <AccordionTrigger className="hover:no-underline">
              <span className="text-sm font-medium">{folder.name}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1">
                {folder.feeds.map((feed) => (
                  <div
                    key={feed.id}
                    className={`flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer ${selectedFeedId === feed.id ? "bg-accent" : ""}`}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 h-8 px-2"
                      onClick={() => onFeedSelect(feed.id)}
                    >
                      <Rss className="h-4 w-4" />
                      <span className="text-sm truncate">{feed.title}</span>
                      {feed.unreadCount > 0 && (
                        <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 rounded-full">
                          {feed.unreadCount}
                        </span>
                      )}
                    </Button>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => handleRefreshFeed(feed.id, e)}
                        disabled={refreshingFeeds.includes(feed.id)}
                      >
                        <RefreshCw
                          className={`h-4 w-4 ${refreshingFeeds.includes(feed.id) ? "animate-spin" : ""}`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onFeedSettings(feed.id)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
};

export default FeedList;
