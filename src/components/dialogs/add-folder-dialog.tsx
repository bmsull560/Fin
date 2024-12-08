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
import { useFolders } from "@/lib/hooks/use-folders";
import { Loader2 } from "lucide-react";

interface AddFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddFolderDialog({ open, onOpenChange }: AddFolderDialogProps) {
  const [name, setName] = useState("");
  const { toast } = useToast();
  const { createFolder } = useFolders();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFolder.mutateAsync(name);
      toast({ title: "Folder created successfully" });
      onOpenChange(false);
      setName("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error creating folder",
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
          <DialogDescription>
            Create a new folder to organize your feeds
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Folder Name</Label>
              <Input
                id="name"
                placeholder="e.g., Tech News"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={createFolder.isPending}>
              {createFolder.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Folder
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
