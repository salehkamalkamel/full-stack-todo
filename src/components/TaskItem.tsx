"use client";
import { deleteTask, editTask } from "@/actions/actions";
import { Task } from "@/lib/types";
import { useState } from "react";

export default function TaskItem({ task }: { task: Task }) {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [title, setTitle] = useState(task.title);
  const [isEditing, setIsEditing] = useState(false);

  async function handleEdit() {
    const newTask = { ...task, title, completed: isCompleted };
    await editTask(task.id, newTask);
    setIsEditing(false);
  }
  return (
    <li className="w-full rounded-4xl flex items-center justify-between px-6 py-4 bg-amber-50">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => {
            const newCompleted = !isCompleted;
            setIsCompleted(newCompleted);
            const newTask = { ...task, completed: newCompleted };
            editTask(task.id, newTask);
          }}
          className={`w-4 h-4 rounded-full border cursor-pointer hover:scale-[1.1] ${
            isCompleted ? "border-gray-400 bg-amber-400" : "border-amber-400"
          }`}
        ></button>
        {isEditing ? (
          <input
            className="w-full bg-transparent border-none outline-0 text-lg text-gray-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <p
            className={`text-lg ${
              isCompleted ? " line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {title}
          </p>
        )}
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => deleteTask(task.id)}
          className="p-2 rounded-full bg-purple-700 hover:bg-purple-600 text-xs text-white font-bold flex items-center justify-center cursor-pointer "
        >
          DEL
        </button>
        <button
          onClick={() => (isEditing ? handleEdit() : setIsEditing(true))}
          className="p-2 rounded-full bg-amber-600 hover:bg-amber-700 text-xs text-white font-bold flex items-center justify-center cursor-pointer "
        >
          {isEditing ? "SAVE" : "EDIT"}
        </button>
      </div>
    </li>
  );
}
