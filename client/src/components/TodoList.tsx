import { Todo } from "../App";
import LoadingSpinner from "./LoadingSpinner";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onDelete: (id: string) => void;
  onEdit: (id: string, taskUpdate: object) => void;
  isLoading: boolean;
  moveTask: (taskId: string, direction: string) => void;
};

export default function TodoList({
  todos,
  onDelete,
  onEdit,
  isLoading,
  moveTask,
}: TodoListProps) {
  return (
    <div
      className={`flex flex-col gap-4 w-60 min-[340px]:w-80 min-[470px]:w-[448px] bg-white px-8 py-6 rounded-lg bg-opacity-85 hover:bg-opacity-95 ${
        todos.length === 0 ? "opacity-0" : ""
      } `}
    >
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
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
            moveTask={moveTask}
          />
        ))
      )}
    </div>
  );
}
