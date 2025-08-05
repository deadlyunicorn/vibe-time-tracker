import { Loader2 } from "lucide-react";
import { ActiveTimer } from "./ActiveTimer";
import { Header } from "./Header";
import { Overview } from "./Overview";
import { QuickTimer } from "./QuickTimer";

interface MainViewProps {
  hasBeenInitiated: boolean;
  hasInitializationFailed: boolean;
}

export const MainView = ({
  hasBeenInitiated,
  hasInitializationFailed,
}: MainViewProps) => {
  if (hasInitializationFailed) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Failed retrieving app state.</p>
      </div>
    );
  }

  if (hasBeenInitiated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 lg:p-16 p-8">
        <Header />
        <ActiveTimer />
        <QuickTimer />
        <Overview />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingIndicator />
    </div>
  );
};
