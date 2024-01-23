// display list of todo's
import { Todo } from "../App";
import LoadingSpinner from "./LoadingSpinner";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string, completedStatus: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedData: string) => void;
  isLoading: boolean;
};

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  isLoading,
}: TodoListProps) {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      {isLoading ? (
        <LoadingSpinner />
      ) : todos.length === 0 ? (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {""}
        </h4>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}
