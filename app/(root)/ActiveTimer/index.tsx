import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TimeEntry } from "../interface";
import { generateNewEntry } from "./utils";
import { useGlobalStore } from "../store";

interface ActiveTimerProps {
    onStopTimer: (newEntry: TimeEntry) => void
}

export const ActiveTimer = ({ onStopTimer }: ActiveTimerProps) => {

    const store = useGlobalStore();
    const timer = store.timer;

    if (!timer) {
        return null;
    }
    return <Card className="mb-6 border-green-200 bg-green-50 w-full">
        <CardContent className="pt-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="font-medium">Timer Running</span>
                    </div>
                    <Badge variant="secondary">{timer.project}</Badge>
                    <Badge variant="outline">{timer.topic}</Badge>
                    <span className="text-sm text-muted-foreground">Started at {timer.startTime}</span>
                </div>
                <Button onClick={() => {
                    const newEntry = generateNewEntry({ activeTimer: timer, selectedDate: new Date().toISOString().split("T")[0] })
                    if (newEntry) {
                        onStopTimer(newEntry);
                    }
                }} variant="destructive" size="sm">
                    <div className="w-4 h-4 mr-2" />
                    Stop Timer
                </Button>
            </div>
        </CardContent>
    </Card>
}