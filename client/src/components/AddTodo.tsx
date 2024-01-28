import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type AddTodoProps = {
  onAddTodo: (title: string) => void;
};

export default function AddTodo({ onAddTodo }: AddTodoProps) {
  const [taskTitle, setTaskTitle] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAddTodo(taskTitle);
    setTaskTitle("");
  };

  return (
    <form
      className="flex w-full max-w-md items-center space-x-2"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Add task"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <Button
        disabled={!taskTitle}
        type="submit"
        className="disabled:bg-black disabled:opacity-100 disabled:cursor-not-allowed
       hover:bg-green-500 transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300 
        "
      >
        <Plus />
      </Button>
    </form>
  );
}
