export interface GetEntriesForRangeBody {
  userId: string;
  startTime: string;
  endTime: string;
  entriesPerPage?: string;
  currentPage?: string;
}

export interface GetEntriesForRangeParsedBody  {
  userId: number;
  startTime: number;
  endTime: number;
  entriesPerPage?: number;
  currentPage?: number;
}

export interface GetEntriesForRangeFromDbBody {
  userId: number;
  startTime: number;
  endTime: number;
  skip: number;
  limit: number;
}
