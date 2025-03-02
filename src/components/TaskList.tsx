import { prisma } from "@/lib/prisma";
import TaskItem from "./TaskItem";
import { z } from "zod";
import { taskSchema } from "@/lib/types";

export default async function TaskList() {
  const tasksSchema = z.array(taskSchema); // Validate an array of tasks

  // Fetch tasks from the database
  const tasks = await prisma.task.findMany(); // Must await

  // Validate fetched tasks
  const validatedTasks = tasksSchema.safeParse(tasks);

  if (!validatedTasks.success) {
    console.error("Failed to validate tasks", validatedTasks.error);
    return null;
  }

  return (
    <ul className="w-full max-w-[600px] flex flex-col items-center justify-center gap-2 p-4 rounded-4xl bg-gray-200">
      {validatedTasks.data.length > 0 ? (
        validatedTasks.data.map((task) => (
          <TaskItem task={task} key={task.id} />
        ))
      ) : (
        <p className="text-center text-gray-800 text-xl">No tasks found</p>
      )}
    </ul>
  );
}
