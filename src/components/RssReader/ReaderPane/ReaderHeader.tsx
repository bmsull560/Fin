import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Moon,
  Sun,
  Share2,
  Bookmark,
  TextQuote,
  MinusCircle,
  PlusCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ReaderHeaderProps {
  title?: string;
  feedTitle?: string;
  isDarkMode?: boolean;
  fontSize?: "small" | "medium" | "large";
  onThemeToggle?: () => void;
  onFontSizeChange?: (size: "small" | "medium" | "large") => void;
  onShare?: () => void;
  onBookmark?: () => void;
}

const ReaderHeader = ({
  title = "Sample Article Title",
  feedTitle = "Sample Feed",
  isDarkMode = false,
  fontSize = "medium",
  onThemeToggle = () => {},
  onFontSizeChange = () => {},
  onShare = () => {},
  onBookmark = () => {},
}: ReaderHeaderProps) => {
  return (
    <div className="w-[852px] h-[60px] bg-background border-b flex items-center justify-between px-6">
      <div className="flex-1 min-w-0 mr-4">
        <h1 className="text-lg font-semibold truncate">{title}</h1>
        <p className="text-sm text-muted-foreground truncate">{feedTitle}</p>
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={fontSize}
          onValueChange={(value: "small" | "medium" | "large") =>
            onFontSizeChange(value)
          }
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Font size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">
              <div className="flex items-center gap-2">
                <MinusCircle className="h-4 w-4" />
                <span>Small</span>
              </div>
            </SelectItem>
            <SelectItem value="medium">
              <div className="flex items-center gap-2">
                <TextQuote className="h-4 w-4" />
                <span>Medium</span>
              </div>
            </SelectItem>
            <SelectItem value="large">
              <div className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Large</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <TooltipProvider>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onThemeToggle}
                  className="h-8 w-8"
                >
                  {isDarkMode ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isDarkMode ? "Light mode" : "Dark mode"}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onShare}
                  className="h-8 w-8"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share article</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onBookmark}
                  className="h-8 w-8"
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bookmark article</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ReaderHeader;
