import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getFolders, createFeed } from "@/lib/api";
import AddFeedButton from "./AddFeedButton";
import AddFeedDialog from "./AddFeedDialog";
import FeedList from "./FeedList";

interface SidebarProps {
  selectedFeedId?: string;
  onFeedSelect?: (feedId: string) => void;
  onFeedSettings?: (feedId: string) => void;
}

const Sidebar = ({
  selectedFeedId = "",
  onFeedSelect = () => {},
  onFeedSettings = () => {},
}: SidebarProps) => {
  const [folders, setFolders] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAddFeedDialogOpen, setIsAddFeedDialogOpen] = React.useState(false);

  useEffect(() => {
    loadFolders();
  }, []);

  const loadFolders = async () => {
    try {
      const data = await getFolders();
      setFolders(data);
    } catch (error) {
      console.error("Error loading folders:", error);
    }
  };

  const handleAddFeed = async (url: string) => {
    try {
      await createFeed({ title: url, url }); // We'll update the title after fetching the feed
      loadFolders(); // Reload the folders to get the new feed
    } catch (error) {
      console.error("Error adding feed:", error);
    }
  };

  return (
    <div className="w-[280px] h-[982px] bg-background border-r flex flex-col">
      <div className="p-4 space-y-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search feeds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <AddFeedButton onClick={() => setIsAddFeedDialogOpen(true)} />
      </div>

      <div className="flex-1 overflow-hidden">
        <FeedList
          folders={folders}
          selectedFeedId={selectedFeedId}
          onFeedSelect={onFeedSelect}
          onFeedSettings={onFeedSettings}
        />
      </div>

      <AddFeedDialog
        open={isAddFeedDialogOpen}
        onOpenChange={setIsAddFeedDialogOpen}
        onSubmit={handleAddFeed}
      />
    </div>
  );
};

export default Sidebar;
