"use client";
// import { useEffect, useState } from "react";
// import { ITimer } from "./ActiveTimer/interface";
// import { useGlobalStore } from "./store";
import { AuthenticatedView } from "@/components/AuthenticatedView";
import { StoreInitializer } from "./StoreInitializer";
import { useGlobalStore } from "./store";
import { MainView } from "./Main";
// import { Overview } from "./Overview";

export default function Home() {
  const store = useGlobalStore();
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
      <MainView
        hasBeenInitiated={store.hasBeenInitiated}
        hasInitializationFailed={store.hasInitializationFailed}
      />
      <StoreInitializer />
    </AuthenticatedView>
  );
}
