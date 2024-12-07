import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface AddFeedButtonProps {
  onClick?: () => void;
}

const AddFeedButton = ({ onClick = () => {} }: AddFeedButtonProps) => {
  return (
    <div className="w-[240px] h-[40px] bg-background p-2">
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={onClick}
      >
        <PlusCircle className="h-4 w-4" />
        <span>Add Feed</span>
      </Button>
    </div>
  );
};

export default AddFeedButton;
