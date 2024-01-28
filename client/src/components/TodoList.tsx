import { Todo } from "../App";
import LoadingSpinner from "./LoadingSpinner";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onDelete: (id: string) => void;
  onEdit: (id: string, taskUpdate: object) => void;
  isLoading: boolean;
};

export default function TodoList({
  todos,
  onDelete,
  onEdit,
  isLoading,
}: TodoListProps) {
  return (
    <div
      className={`flex flex-col gap-4 w-[448px] bg-white px-8 py-6 rounded-lg bg-opacity-85 ${
        todos.length === 0 ? "opacity-0" : ""
      } `}
    >
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
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}
