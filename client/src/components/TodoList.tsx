// display list of todo's
import { Todo } from "../App";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[]; //array of Todo objects
  onToggle: (id: number) => void; //received from App.tsx, passing down to each Todo item; prop-drilling
  onDelete: (id: number) => void;
};

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <div className="flex flex-col gap-4">
      {todos.length === 0 ? (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          No Todos yet!{" "}
        </h4>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}
