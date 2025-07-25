import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { useState } from "react";

interface EditableBadgeProps {
  initialValue: string;
  onUpdate: (newValue: String) => void;
}

export const EditableBadge = ({
  initialValue,
  onUpdate,
}: EditableBadgeProps) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    if (isEditing) {
      onUpdate(value);
    }
    setIsEditing(false);
  };

  return (
    <Badge
      variant="outline"
      onBlur={handleUpdate}
      onSelect={() => {
        setIsEditing(true);
      }}
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === "enter") {
          handleUpdate();
          alert("Pressed enter");
        }
      }}
    >
      <input
        className={`w-fit outline-none ${
          isEditing ? "cursor-text" : "cursor-default"
        }`}
        value={value}
        onChange={(e) => {
          if (!isEditing) {
            return;
          }
          setValue(e.target.value);
        }}
      />
      <div className="w-2 flex">
        <Edit />
      </div>
    </Badge>
  );
};
