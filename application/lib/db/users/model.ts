import { ObjectId } from "mongodb";

export interface UserModel {
  _id: ObjectId;
  username: string;
  passwordHash: string;
  projects: string[];
  topics: string[];
  userId: number;
}
