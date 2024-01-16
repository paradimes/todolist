import { useCallback, useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import "./index.css";
import TodoList from "./components/TodoList";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function App() {
  const initialValue = JSON.parse(localStorage.getItem("todos") || "");

  const [todos, setTodos] = useState<Todo[]>(
    initialValue !== "" ? initialValue : []
  );

  const addTodo = (title: string) => {
    const newTodo = { id: Date.now(), title, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const saveData = useCallback(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    saveData();
  }, [saveData, todos]);

  return (
    <div className="p-10 flex flex-col gap-5">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
        To Do List
      </h1>
      <AddTodo onAddTodo={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}
