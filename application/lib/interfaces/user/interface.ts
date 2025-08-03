import { TimeEntry } from "@/app/(root)/interface";

export interface AddProjectBody {
  userId: number;
  project: string;
}

export interface AddTopicBody {
  userId: number;
  topic: string;
}

export interface CreateEntryBody {
  userId: number;
  entry: TimeEntry;
}

export interface FinalizeEntryBody {
  userId: number;
  entry: TimeEntry & { endTime: number };
}

export interface GetActiveTimerParams {
  userId: number;
}

export interface UpdateEntryBody {
  userId: number;
  entry: TimeEntry;
}

export interface DeleteEntryBody {
  userId: number;
  startTime: number;
}