import { TimeEntry } from "@/app/(root)/interface";
import { Button } from "@/components/ui/button";
import { Edit, Pause, Trash } from "lucide-react";

export const EntryButtons = ({ entry }: { entry: TimeEntry }) => {
  const isActive = !entry.endTime;

  const editEntry = (entry: TimeEntry) => {
    alert("Hello world");
  };
  const deleteEntry = (entry: TimeEntry) => {
    alert("Hello world");
  };

  if (!isActive) {
    return (
      <>
        <Button variant="ghost" size="sm" onClick={() => editEntry(entry)}>
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deleteEntry(entry)}>
          <Trash className="w-4 h-4" />
        </Button>
      </>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        alert("Pause active");
      }}
    >
      <Pause className="w-4 h-4" />
    </Button>
  );
};
