import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAddFeedDialogOpen, setIsAddFeedDialogOpen] = React.useState(false);

  const handleAddFeed = (url: string) => {
    // Placeholder for feed addition logic
    console.log("Adding feed:", url);
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
