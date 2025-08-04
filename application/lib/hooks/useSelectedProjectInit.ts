import { useEffect } from "react";
import { useGlobalStore } from "@/app/(root)/store";

export const useSelectedProjectInit = (projects: string[]) => {
  const store = useGlobalStore();

  useEffect(() => {
    if (!store.selectedProject) {
      store.setSelectedProject(projects[0]);
    }
  }, [projects, store]);
};
