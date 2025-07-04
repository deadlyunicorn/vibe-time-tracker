
export interface TimeEntry {
    id: string
    project: string
    topic: string
    startTime: string
    endTime: string
    date: string
    duration: number // in minutes
    description?: string
}

export interface ActiveTimer {
    project: string
    topic: string
    startTime: string
    description?: string
}