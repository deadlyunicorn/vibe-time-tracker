export interface TimeEntry {
  project: string;
  topic: string;
  startTime: number;
  endTime?: number;
  description?: string | null;
}

export interface WithOfflineSupport {
  isOnline: boolean;
}