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


