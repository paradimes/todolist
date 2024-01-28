import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import "./index.css";
import TodoList from "./components/TodoList";
import TaskAlert from "./components/TaskAlert";
import LoginButtonAuth0 from "./components/LoginButtonAuth0";
import LoadingSpinner from "./components/LoadingSpinner";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButtonAuth0 from "./components/ui/LogoutButtonAuth0";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function App() {
  const { user = {}, isAuthenticated, isLoading: Auth0Loading } = useAuth0();

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
        body: JSON.stringify({ userId: user.email, title }),
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

  const deleteTodo = async (taskId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/deleteTodo`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.email, taskId }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== taskId));
      setNotificationWithTimeout("Task deleted.");
    } catch (error) {
      console.error("Delete todo failed:", error);
    }
  };

  const editTodo = async (taskId: string, newTitle: string) => {
    const updatedData = {
      userId: user.email,
      taskId: taskId,
      update: { title: newTitle },
    };

    try {
      const response = await fetch(`http://localhost:3001/editTodo`, {
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
        prevTodos.map((todo) => (todo.id === taskId ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Update todo failed:", error);
    }
  };

  const toggleTodo = async (taskId: string, completedStatus: boolean) => {
    const updatedData = {
      userId: user.email,
      taskId: taskId,
      update: { completed: completedStatus },
    };

    try {
      const response = await fetch(`http://localhost:3001/editTodo`, {
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
        prevTodos.map((todo) => (todo.id === taskId ? updatedTodo : todo))
      );
      if (completedStatus === true) {
        setNotificationWithTimeout("Task completed!");
      }
    } catch (error) {
      console.error("Toggle todo failed:", error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3001/getTodos?userEmail=${user.email}`
        );
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
    if (user.email) {
      fetchTodos();
    }
  }, [user.email]);

  // bg-[url('./assets/bg-2.jpeg')]
  return (
    <div
      className="w-full p-10 flex relative flex-col items-center gap-5 min-h-screen bg-cover  overflow-x-clip 
    "
    >
      <div className="flex justify-end w-full">
        {isAuthenticated ? <LogoutButtonAuth0 /> : <LoginButtonAuth0 />}
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl text-white">
        To Do List
      </h1>
      <AddTodo onAddTodo={addTodo} />
      {Auth0Loading ? (
        <LoadingSpinner />
      ) : (
        isAuthenticated && (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            isLoading={isLoading}
          />
        )
      )}
      <TaskAlert notification={notification} />
    </div>
  );
}
