"use server";

import { prisma } from "@/lib/prisma";
import { addTaskSchema, Task } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData): Promise<void> {
  try {
    const title = formData.get("title")?.toString().trim();

    if (!title) {
      console.error("Task title is required");
      return; // Ensure function returns void
    }

    const validatedTask = addTaskSchema.safeParse({ title });

    if (!validatedTask.success) {
      console.error("Failed to validate task", validatedTask.error);
      return;
    }

    await prisma.task.create({
      data: {
        title: validatedTask.data.title,
        completed: false,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Database error:", error);
  }
}

export async function editTask(taskId: string, newTask: Task) {
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: newTask,
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Database error:", error);
  }
}

export async function deleteTask(taskId: string) {
  try {
    await prisma.task.delete({
      where: { id: taskId },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Database error:", error);
  }
}
