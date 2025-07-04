export interface IAlert {
  summary: string;
  description: string;
  type: AlertType;
}

export enum AlertType {
  Error = "error",
  Info = "info",
  Success = "success",
}
