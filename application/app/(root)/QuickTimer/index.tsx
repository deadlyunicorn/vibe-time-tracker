"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useGlobalStore } from "../store";
import { Clock, Play } from "lucide-react";
import { VerticalInputWithLabelWrapper } from "@/components/VerticalInputWithLabelWrapper";
import { ComboBox } from "@/components/ui/comboBox";
import { Utils } from "@/lib/utils/index";
import { UserService } from "@/lib/services/users";
import { AlertType } from "@/components/AlertListener/interface";

export const QuickTimer = () => {
  const store = useGlobalStore();

  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");

  const { availableProjects } = store;
  const { availableTopics } = store;

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

  const handleAddNewProject = (project: string) => {
    Utils.alertOnError(() => {
      const userId = UserService.getCurrentUserId();
      if (!userId) {
        throw new Error("User is not logged in. User Id: " + userId);
      }
      return UserService.addProjectEntry({
        project,
        userId,
      }).then((response) => {
        Utils.dispatchAlert({
          summary: "Success",
          type: AlertType.Success,
          description: "Project added successfully",
        });
        return response;
      });
    }).then(() => {
      store.restartState();
    });
  };

  const handleAddNewTopic = (topic: string) => {
    Utils.alertOnError(() => {
      const userId = UserService.getCurrentUserId();
      if (!userId) {
        throw new Error("User is not logged in. User Id: " + userId);
      }
      return UserService.addTopicEntry({
        topic,
        userId,
      }).then((response) => {
        Utils.dispatchAlert({
          summary: "Success",
          type: AlertType.Success,
          description: "Topic added successfully",
        });
        return response;
      });
    }).then(() => {
      store.restartState();
    });
  };

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
            entries={availableProjects.map(Utils.stringToLabelValue)}
            title={"Project"}
            onSelect={(value) => {
              setProject(value);
            }}
            onNewEntry={handleAddNewProject}
          />
          <ComboBox
            entries={availableTopics.map(Utils.stringToLabelValue)}
            title={"Topic"}
            onSelect={(value) => {
              setTopic(value);
            }}
            onNewEntry={handleAddNewTopic}
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
