import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, LayoutList, SortAsc, SortDesc } from "lucide-react";

interface ArticleListHeaderProps {
  sortOrder?: "asc" | "desc";
  viewMode?: "grid" | "list";
  onSortOrderChange?: (order: "asc" | "desc") => void;
  onViewModeChange?: (mode: "grid" | "list") => void;
}

const ArticleListHeader = ({
  sortOrder = "desc",
  viewMode = "list",
  onSortOrderChange = () => {},
  onViewModeChange = () => {},
}: ArticleListHeaderProps) => {
  return (
    <div className="w-[380px] h-[60px] bg-background border-b flex items-center justify-between px-4">
      <Select
        defaultValue={sortOrder}
        onValueChange={(value: "asc" | "desc") => onSortOrderChange(value)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Sort by date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">
            <div className="flex items-center gap-2">
              <SortDesc className="h-4 w-4" />
              <span>Newest first</span>
            </div>
          </SelectItem>
          <SelectItem value="asc">
            <div className="flex items-center gap-2">
              <SortAsc className="h-4 w-4" />
              <span>Oldest first</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-1">
        <Button
          variant={viewMode === "list" ? "secondary" : "ghost"}
          size="icon"
          onClick={() => onViewModeChange("list")}
        >
          <LayoutList className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "grid" ? "secondary" : "ghost"}
          size="icon"
          onClick={() => onViewModeChange("grid")}
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ArticleListHeader;
