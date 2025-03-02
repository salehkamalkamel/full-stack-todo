import { createTask } from "@/actions/actions";
import { prisma } from "@/lib/prisma";

export default async function AddTask() {
  const completedTasks = await prisma.task.findMany({
    where: {
      completed: true,
    },
  });

  const totalTasks = await prisma.task.count();
  return (
    <form
      action={createTask}
      className="w-full max-w-[600px] flex flex-col gap-4 items-center justify-center m-4 p-8 rounded-4xl bg-amber-50 text-gray-900 text-xl"
    >
      <input
        name="title"
        type="text"
        required
        placeholder="Add Your task here."
        className="w-full bg-transparent border-none outline-0 "
      />
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-2 items-center justify-center">
          <div className="p-2 rounded-full border-2 border-gray-500 text-sm font-bold text-gray-500">
            {completedTasks.length} Completed
          </div>
          <div className="p-2 rounded-full border-2 border-gray-500 text-sm font-bold text-gray-500">
            {totalTasks - completedTasks.length} Todo
          </div>
        </div>
        <button
          type="submit"
          className="w-8 h-8 rounded-full bg-purple-700  text-white font-bold text-xl flex items-center justify-center cursor-pointer hover:bg-purple-600"
        >
          +
        </button>
      </div>
    </form>
  );
}
