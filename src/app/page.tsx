import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <AddTask />
      <TaskList />
    </div>
  );
}
