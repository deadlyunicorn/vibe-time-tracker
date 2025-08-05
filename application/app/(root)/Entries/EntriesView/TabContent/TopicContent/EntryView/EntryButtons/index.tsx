import { TimeEntry } from "@/app/(root)/interface";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Edit, Pause, Trash } from "lucide-react";
import { useState } from "react";
import { useGlobalStore } from "@/app/(root)/store";
import { EntryService } from "@/lib/client-service/entries";
import { UserService } from "@/lib/client-service/users";
import { Utils } from "@/lib/utils/index";
import { AlertType } from "@/components/AlertListener/interface";
import { UserNotLoggedInError } from "@/lib/errors/general-errors";
import { getIsOffline, OfflineStorageUtils } from "@/lib/utils/offline";

export const EntryButtons = ({ entry }: { entry: TimeEntry }) => {
  const isActive = !entry.endTime;
  const store = useGlobalStore();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const editEntry = (entry: TimeEntry) => {
    alert("Edit functionality coming soon!");
  };

  const deleteEntry = async (entry: TimeEntry) => {
    Utils.alertOnError(async () => {
      const userId = UserService.getCurrentUserId();
      if (!userId) {
        throw new UserNotLoggedInError(userId);
      }

      await EntryService.deleteEntry({
        userId,
        startTime: entry.startTime,
        isOnline: !getIsOffline(),
      });

      store.removeEntry(entry.startTime);

      Utils.dispatchAlert({
        summary: "Success",
        type: AlertType.Success,
        description: "Entry deleted successfully",
      });
    });
  };

  if (!isActive) {
    return (
      <>
        <Button variant="ghost" size="sm" onClick={() => editEntry(entry)}>
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash className="w-4 h-4" />
        </Button>

        <ConfirmDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          title="Delete Entry"
          description={`Are you sure you want to delete this entry for "${entry.project}" - "${entry.topic}"? The entry will be marked as deleted but can be recovered if needed.`}
          onConfirm={() => deleteEntry(entry)}
          confirmText="Delete"
          cancelText="Cancel"
          variant="destructive"
        />
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
