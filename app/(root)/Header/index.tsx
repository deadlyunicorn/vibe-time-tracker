import { Input } from "@/components/ui/input";
import { useGlobalStore } from "../store";

export const Header = () => {
  const store = useGlobalStore();
  const selectedDate = store.selectedDate;

  return (
    <div className="container mx-auto p-6 max-w-6xl w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Time Tracker</h1>
          <p className="text-muted-foreground">
            Track your time across projects and topics
          </p>
        </div>
        <div className="flex items-center gap-1">
          <h3>Viewing</h3>
          {selectedDate.toDateString()}
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={selectedDate.toDateString()}
              onChange={(e) => store.setSelectedDate(new Date(e.target.value))}
              className="w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
