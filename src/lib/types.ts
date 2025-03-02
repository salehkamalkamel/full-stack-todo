import { z } from "zod";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
});

export const addTaskSchema = z.object({
  title: z.string(),
});
