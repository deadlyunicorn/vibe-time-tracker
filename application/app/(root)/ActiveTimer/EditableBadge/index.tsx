import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { useRef, useState } from "react";
import { handleEditableBadgeUpdate } from "./utils";

interface EditableBadgeProps {
  initialValue: string;
  onUpdate: (newValue: string) => void | Promise<void>;
}

export const EditableBadge = ({
  initialValue,
  onUpdate,
}: EditableBadgeProps) => {
  const valueRef = useRef(initialValue);
  const inputElementRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    handleEditableBadgeUpdate({
      valueRef,
      inputElementRef,
      isEditing,
      newValue: value,
      onUpdate,
      setIsEditing,
    });
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
        }
      }}
    >
      <input
        className={`w-fit outline-none ${
          isEditing ? "cursor-text" : "cursor-default"
        }`}
        ref={inputElementRef}
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
