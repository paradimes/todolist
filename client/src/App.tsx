import { useCallback, useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import "./index.css";
import TodoList from "./components/TodoList";
import { Trash2, Plus, Check } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";

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
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationTimer, setNotificationTimer] =
    useState<NodeJS.Timeout | null>(null);

  const setNotificationWithTimeout = (message: string) => {
    if (notificationTimer) {
      clearTimeout(notificationTimer);
    }

    setNotification(message);
    const newTimer = setTimeout(() => {
      setNotification(null);
      setNotificationTimer(null);
    }, 3000);

    setNotificationTimer(newTimer);
  };

  const addTodo = (title: string) => {
    const newTodo = { id: Date.now(), title, completed: false };
    setTodos([...todos, newTodo]);
    setNotificationWithTimeout("Task added!");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id && todo.completed === false)
          setNotificationWithTimeout("Task completed!");
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      })
    );
  };
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setNotificationWithTimeout("Task deleted.");
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
      {notification === "Task added!" ? (
        <Alert variant={"default"}>
          <Plus className="h-4 w-4" />
          <AlertTitle>{notification}</AlertTitle>
        </Alert>
      ) : notification === "Task deleted." ? (
        <Alert variant={"destructive"}>
          <Trash2 className="h-4 w-4" />
          <AlertTitle>{notification}</AlertTitle>
        </Alert>
      ) : (
        notification === "Task completed!" && (
          <Alert variant={"default"}>
            <Check className="h-4 w-4" color="#22c55e" />
            <AlertTitle className="text-green-500">{notification}</AlertTitle>
          </Alert>
        )
      )}
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}
