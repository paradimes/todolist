// form to add new todo

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AddTodoProps = {
  onAddTodo: (title: string) => void;
};

export default function AddTodo({ onAddTodo }: AddTodoProps) {
  const [taskTitle, setTaskTitle] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAddTodo(taskTitle); // creates a TodoItem and appends it to the TodoList
    setTaskTitle("");
  };

  return (
    <form
      className="flex w-full max-w-sm items-center space-x-2"
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
        className="disabled:bg-black disabled:opacity-100 disabled:cursor-not-allowed"
      >
        Add
      </Button>
    </form>
  );
}
