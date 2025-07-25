"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";
import { useGlobalStore } from "../store";
import { Clock, Play } from "lucide-react";
import { VerticalInputWithLabelWrapper } from "@/components/VerticalInputWithLabelWrapper";
import { ComboBox } from "@/components/ui/comboBox";
import { Utils } from "@/lib/utils/index";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  handleAddNewProject,
  handleAddNewTopic,
  handleStartTimer,
} from "./utils";

const lastProjectLocalStorageKey = "LAST_PROJECT";

export const QuickTimer = () => {
  const store = useGlobalStore();

  const { availableProjects, availableTopics } = store;

  const lastProject = useMemo(() => {
    const _lastProject = localStorage.getItem(lastProjectLocalStorageKey) ?? "";
    if (availableProjects.includes(_lastProject)) {
      return _lastProject;
    }
    return "";
  }, []);

  const [project, setProject] = useState(lastProject);
  const [description, setDescription] = useState<string>("");
  const [topic, setTopic] = useState("");

  if (store.timer) {
    return null;
  }

  return (
    <Card className="mb-6 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Quick Timer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ComboBox
            initialValue={project}
            entries={availableProjects.map(Utils.stringToLabelValue)}
            title={"Project"}
            onSelect={(value) => {
              setProject(value);
              localStorage.setItem(lastProjectLocalStorageKey, value);
            }}
            onNewEntry={(project) => handleAddNewProject(project, store)}
          />
          <ComboBox
            entries={availableTopics.map(Utils.stringToLabelValue)}
            title={"Topic"}
            onSelect={(value) => {
              setTopic(value);
            }}
            onNewEntry={(topic) => handleAddNewTopic(topic, store)}
          />

          <VerticalInputWithLabelWrapper>
            <Label htmlFor="quick-description">Description (optional)</Label>
            <Input
              id="quick-description"
              placeholder="What are you working on?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </VerticalInputWithLabelWrapper>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  onClick={() =>
                    handleStartTimer({ description, project, store, topic })
                  }
                  disabled={!project || !topic || !!store.timer}
                  className="w-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Timer
                </Button>
              </div>
            </TooltipTrigger>
            {!!store.timer && <TooltipContent>Timer is active</TooltipContent>}
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
};
