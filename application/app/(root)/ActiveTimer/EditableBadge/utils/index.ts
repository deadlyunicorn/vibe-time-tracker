import { Utils } from "@/lib/utils/index";
import { Dispatch, RefObject, SetStateAction } from "react";

interface IHandleUpdate {
  valueRef: RefObject<string>;
  isEditing: boolean;
  newValue: string;
  inputElementRef: RefObject<HTMLInputElement | null>;
  onUpdate: (newValue: string) => void | Promise<void>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export const handleEditableBadgeUpdate = ({
  valueRef,
  isEditing,
  newValue,
  inputElementRef,
  onUpdate,
  setIsEditing,
}: IHandleUpdate) =>
  Utils.alertOnError(async () => {
    const registeredValue = valueRef.current;
    if (isEditing) {
      if (newValue == valueRef.current) {
        return;
      }
      valueRef.current = newValue;
      try {
        await onUpdate(newValue);
      } catch (error) {
        valueRef.current = registeredValue;
        inputElementRef.current?.focus();
        throw error;
      }
    }
    setIsEditing(false);
  });
