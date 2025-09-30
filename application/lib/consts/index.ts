export enum Events {
  Alert = "alert",
}

export enum RequestStatus {
  Successful = "successful",
  Unsuccessful = "unsuccessful",
}

export const UserIdKey = "userId";

export namespace Events {
  export const OnlineEventName = "online";
  export const OfflineEventName = "offline";
  export const SyncStartEventName = "sync-start";
  export const SyncCompleteEventName = "sync-complete";
}
