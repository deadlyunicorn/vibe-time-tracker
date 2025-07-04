// import { useEffect, useState } from "react";
import { Header } from "./Header";
import { ActiveTimer } from "./ActiveTimer";
// import { ITimer } from "./ActiveTimer/interface";
// import { useGlobalStore } from "./store";
import { QuickTimer } from "./QuickTimer";
import { Overview } from "./Overview";
import { AuthenticatedView } from "@/components/AuthenticatedView";
import { StoreInitializer } from "./StoreInitializer";
// import { Overview } from "./Overview";

export default async function Home() {
  // const store = useGlobalStore();
  // const entries = store.entries;
  // const [activeTimer, setActiveTimer] = useState<ITimer | null>(null)

  // Load data from localStorage on mount
  // useEffect(() => {
  //     const savedEntries = localStorage.getItem("timeEntries")
  //     const savedTimer = localStorage.getItem("activeTimer")

  //     if (savedEntries) {
  //         store.loadEntries(JSON.parse(savedEntries))
  //     }

  //     if (savedTimer) {
  //         setActiveTimer(JSON.parse(savedTimer))
  //     }
  // }, [store])

  // // Save to localStorage whenever entries or activeTimer changes
  // useEffect(() => {
  //     localStorage.setItem("timeEntries", JSON.stringify(entries))
  // }, [entries])

  // useEffect(() => {
  //     if (activeTimer) {
  //         localStorage.setItem("activeTimer", JSON.stringify(activeTimer))
  //     } else {
  //         localStorage.removeItem("activeTimer")
  //     }
  // }, [activeTimer])

  // const deleteEntry = (id: string) => {
  //     setEntries((prev) => prev.filter((entry) => entry.id !== id))
  // }

  // const editEntry = (entry: TimeEntry) => {
  //     setEditingEntry(entry)
  //     setProject(entry.project)
  //     setTopic(entry.topic)
  //     setStartTime(entry.startTime)
  //     setEndTime(entry.endTime)
  //     setDescription(entry.description || "")
  //     setIsAddDialogOpen(true)
  // }

  // const handleStopTimer = (newEntry: TimeEntry) => {

  //     store.loadEntriessetEntries((prev) => [...prev, newEntry])
  //     setActiveTimer(null)
  // }

  return (
    <AuthenticatedView>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 lg:p-16 p-8">
        <Header />
        <ActiveTimer />
        <QuickTimer />
        <Overview />
      </div>
      <StoreInitializer />
    </AuthenticatedView>
  );
}
