import zod, { ZodString } from "zod";

export const UserIdValidator = zod
  .number({ message: "User ID is required" })
  .min(1, "User ID is required");

export const ProjectValidator = zod
  .string()
  .min(6, "Project should be at least 6 characters long");

export const TopicValidator = zod
  .string()
  .min(6, "Topic should be at least 6 characters long");

export const DescriptionValidator = zod
  .string()
  .min(6, "Description should be at least 6 characters long")
  .optional();

export const MsSinceEpochValidator = zod
  .number()
  .min(1_700_000_000_000, "Please provide time in MS since UNIX epoch");
