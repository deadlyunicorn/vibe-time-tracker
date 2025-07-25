import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export const EndActiveTimerAndStartNewOfSelectedTopicButton = () => {
  return (
    <Button
      className="aspect-square h-full"
      variant={"outline"}
      onClick={(e) => {
        e.stopPropagation();
        alert("Starting and stopping");
      }}
    >
      <PlayCircle />
    </Button>
  );
};
