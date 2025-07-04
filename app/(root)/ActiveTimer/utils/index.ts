import { TimeEntry } from "../../interface"
import { Utils } from "../../utils"
import { ITimer } from "../interface"

export const generateNewEntry = ({ activeTimer, selectedDate }: { activeTimer: ITimer, selectedDate: string }): TimeEntry | undefined => {
    if (!activeTimer) return

    const now = new Date()
    const endTimeString = now.toTimeString().slice(0, 5)
    const duration = Utils.calculateDuration(activeTimer.startTime, endTimeString)

    const newEntry: TimeEntry = {
        id: Date.now().toString(),
        project: activeTimer.project,
        topic: activeTimer.topic,
        startTime: activeTimer.startTime,
        endTime: endTimeString,
        date: selectedDate,
        duration,
        description: activeTimer.description,
    }

    return newEntry;

}