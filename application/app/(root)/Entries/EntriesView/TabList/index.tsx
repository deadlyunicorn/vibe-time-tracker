import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TabList = ({ projects }: { projects: string[] }) => {
  return (
    <TabsList>
      {projects.map((project) => (
        <TabsTrigger
          key={`${project}_tab_selector`}
          value={project}
          className="capitalize text-lg p-4 mx-2"
        >
          {project}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
