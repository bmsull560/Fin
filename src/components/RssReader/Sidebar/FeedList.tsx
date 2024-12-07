import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Rss, ChevronRight, Settings } from "lucide-react";

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
  return (
    <div className="w-[280px] h-[800px] bg-background border rounded-md">
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-1"
                        onClick={() => onFeedSettings(feed.id)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
};

export default FeedList;
