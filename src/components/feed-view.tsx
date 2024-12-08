import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LayoutGrid, LayoutList } from "lucide-react";

export function FeedView() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">All Articles</h2>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon">
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="p-4 cursor-pointer hover:bg-accent">
              <h3 className="font-semibold mb-2">Article Title {i}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <span>Tech News</span>
                <span>•</span>
                <span>5 min ago</span>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
