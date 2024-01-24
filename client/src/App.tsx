import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import "./index.css";
import TodoList from "./components/TodoList";
import TaskAlert from "./components/TaskAlert";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationTimer, setNotificationTimer] =
    useState<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const addTodo = async (title: string) => {
    try {
      const response = await fetch("http://localhost:3001/addTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNotificationWithTimeout("Task added.");
    } catch (error) {
      console.error("Add todo failed:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/deleteTodo/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setNotificationWithTimeout("Task deleted.");
    } catch (error) {
      console.error("Delete todo failed:", error);
    }
  };

  const editTodo = async (id: string, newTitle: string) => {
    const updatedData = {
      title: newTitle,
    };

    try {
      const response = await fetch(`http://localhost:3001/editTodo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Update todo failed:", error);
    }
  };

  const toggleTodo = async (id: string, completedStatus: boolean) => {
    const updatedData = {
      completed: completedStatus,
    };

    try {
      const response = await fetch(`http://localhost:3001/editTodo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      setNotificationWithTimeout("Task completed!");
    } catch (error) {
      console.error("Toggle todo failed:", error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3001/getTodos");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const todos = await response.json();
        setTodos(todos);
      } catch (error) {
        console.error("Fetch todos failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="p-10 flex flex-col items-center  gap-5 bg-[url('./assets/bg-2.jpeg')] h-screen bg-cover">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
        To Do List
      </h1>
      <AddTodo onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
        isLoading={isLoading}
      />
      <TaskAlert notification={notification} />
    </div>
  );
}
