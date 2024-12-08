import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Folder,
  Plus,
  Search,
  Loader2,
  RefreshCw,
  Settings,
  Trash,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFolders } from "@/lib/hooks/use-folders";
import { useFeeds } from "@/lib/hooks/use-feeds";
import { AddFolderDialog } from "./dialogs/add-folder-dialog";
import { AddFeedDialog } from "./dialogs/add-feed-dialog";
import { useToast } from "./ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Sidebar() {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [addFolderOpen, setAddFolderOpen] = useState(false);
  const [addFeedOpen, setAddFeedOpen] = useState(false);
  const { toast } = useToast();

  const { folders, isLoading: foldersLoading, deleteFolder } = useFolders();
  const {
    feeds,
    isLoading: feedsLoading,
    refreshFeed,
    deleteFeed,
  } = useFeeds(selectedFolderId ?? undefined);

  const handleRefreshFeed = async (feedId: string) => {
    try {
      await refreshFeed.mutateAsync(feedId);
      toast({ title: "Feed refreshed successfully" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error refreshing feed",
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    }
  };

  const handleDeleteFeed = async (feedId: string) => {
    try {
      await deleteFeed.mutateAsync(feedId);
      toast({ title: "Feed deleted successfully" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error deleting feed",
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    try {
      await deleteFolder.mutateAsync(folderId);
      toast({ title: "Folder deleted successfully" });
      setSelectedFolderId(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error deleting folder",
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search feeds..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Button
            className="flex-1 justify-start gap-2"
            onClick={() => setAddFolderOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add Folder
          </Button>
          <Button
            className="flex-1 justify-start gap-2"
            onClick={() => setAddFeedOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add Feed
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-4 p-2">
          {foldersLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            folders.map((folder) => (
              <div key={folder.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2",
                      selectedFolderId === folder.id && "bg-accent",
                    )}
                    onClick={() => setSelectedFolderId(folder.id)}
                  >
                    <Folder className="h-4 w-4" />
                    {folder.name}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteFolder(folder.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>

                {selectedFolderId === folder.id && (
                  <div className="ml-4 space-y-1">
                    {feedsLoading ? (
                      <div className="flex justify-center py-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    ) : (
                      feeds.map((feed) => (
                        <div
                          key={feed.id}
                          className="flex items-center justify-between group"
                        >
                          <span className="truncate text-sm px-2 py-1">
                            {feed.title}
                          </span>
                          <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleRefreshFeed(feed.id)}
                              disabled={refreshFeed.isPending}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                >
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDeleteFeed(feed.id)}
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <AddFolderDialog open={addFolderOpen} onOpenChange={setAddFolderOpen} />
      <AddFeedDialog
        open={addFeedOpen}
        onOpenChange={setAddFeedOpen}
        folderId={selectedFolderId ?? undefined}
      />
    </div>
  );
}
