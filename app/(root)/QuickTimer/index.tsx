import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useGlobalStore } from "../store";
import { Clock, Play } from "lucide-react";
import { VerticalInputWithLabelWrapper } from "@/components/VerticalInputWithLabelWrapper";

export const QuickTimer = () => {
  const store = useGlobalStore();

  const entries = store.entries;

  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");

  const allProjects = [...new Set(entries.map((entry) => entry.project))];
  const allTopics = [...new Set(entries.map((entry) => entry.topic))];

  const startTimer = () => {
    if (!project || !topic) return;

    const startTime = new Date();

    store.startTimer({
      project,
      topic,
      startTime,
      description,
    });

    // Clear form
    setProject("");
    setTopic("");
    setDescription("");
  };

  {
    /* Quick Timer Start */
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
          <VerticalInputWithLabelWrapper>
            <Label htmlFor="quick-project">Project</Label>
            <Input
              id="quick-project"
              placeholder="Enter project name"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              list="projects"
            />
            <datalist id="projects">
              {allProjects.map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
          </VerticalInputWithLabelWrapper>
          <VerticalInputWithLabelWrapper>
            <Label htmlFor="quick-topic">Topic</Label>
            <Input
              id="quick-topic"
              placeholder="Enter topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              list="topics"
            />
            <datalist id="topics">
              {allTopics.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </VerticalInputWithLabelWrapper>

          <VerticalInputWithLabelWrapper>
            <Label htmlFor="quick-description">Description (optional)</Label>
            <Input
              id="quick-description"
              placeholder="What are you working on?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </VerticalInputWithLabelWrapper>

          <div className="flex items-end">
            <Button
              onClick={startTimer}
              disabled={!project || !topic || !!store.timer}
              className="w-full"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Timer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
