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
import { Database } from "@/lib/database.types";

type Feed = Database["public"]["Tables"]["feeds"]["Row"];
type Folder = Database["public"]["Tables"]["folders"]["Row"] & {
  feeds: Feed[];
};

interface FeedListProps {
  folders?: Folder[];
  selectedFeedId?: string;
  onFeedSelect?: (feedId: string) => void;
  onFeedSettings?: (feedId: string) => void;
}

const FeedList = ({
  folders = [],
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
                {folder.feeds?.map((feed) => (
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
