import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useFeeds } from "@/lib/hooks/use-feeds";
import { Loader2 } from "lucide-react";

interface AddFeedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folderId?: string;
}

export function AddFeedDialog({
  open,
  onOpenChange,
  folderId,
}: AddFeedDialogProps) {
  const [url, setUrl] = useState("");
  const { toast } = useToast();
  const { createFeed } = useFeeds();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFeed.mutateAsync({ url, folderId });
      toast({ title: "Feed added successfully" });
      onOpenChange(false);
      setUrl("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error adding feed",
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Feed</DialogTitle>
          <DialogDescription>
            Enter the URL of the RSS feed you want to add
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="url">Feed URL</Label>
              <Input
                id="url"
                placeholder="https://example.com/feed.xml"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={createFeed.isPending}>
              {createFeed.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add Feed
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
