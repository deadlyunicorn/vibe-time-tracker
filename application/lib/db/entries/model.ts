import { TimeEntry } from "@/app/(root)/interface";

export interface EntryModel extends TimeEntry {
  userId: number;
  updatedAt: number;
  deletedAt?: number;
}
