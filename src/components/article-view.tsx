import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Share2, Bookmark } from "lucide-react";

export function ArticleView() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4 flex justify-between items-center">
        <div>
          <h2 className="font-semibold">Article Title</h2>
          <p className="text-sm text-muted-foreground">Tech News</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Sun className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <article className="prose dark:prose-invert max-w-none p-8">
          <h1>Article Title</h1>
          <p className="lead">Article excerpt or summary goes here...</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <h2>Section Title</h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <blockquote>
            This is a blockquote that might appear in the article content.
          </blockquote>
        </article>
      </ScrollArea>
    </div>
  );
}
