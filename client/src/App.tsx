import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import "./index.css";
import TodoList from "./components/TodoList";
import TaskAlert from "./components/TaskAlert";
import LoginButtonAuth0 from "./components/LoginButtonAuth0";
import LoadingSpinner from "./components/LoadingSpinner";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "./setup";
import LogoutButtonAuth0 from "./components/LogoutButtonAuth0";

export type Todo = {
  id: string;
  title: string;
  completedStatus: boolean;
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
    if (!isAuthenticated) {
      const newTodo = {
        id: Date.now().toString(),
        title,
        completedStatus: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    } else {
      try {
        const response = await fetch(`${API_URL}/addTodo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.sub, title }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const newTodo = await response.json();
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      } catch (error) {
        console.error("Add todo failed:", error);
      }
    }
    setNotificationWithTimeout("Task added.");
  };

  const deleteTodo = async (taskId: string) => {
    if (!isAuthenticated) {
      const updatedTodos = todos.filter((todo: Todo) => todo.id !== taskId);
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    } else {
      try {
        const response = await fetch(`${API_URL}/deleteTodo`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.sub, taskId }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== taskId));
      } catch (error) {
        console.error("Delete todo failed:", error);
      }
    }
    setNotificationWithTimeout("Task deleted.");
  };

  const editTodo = async (taskId: string, taskUpdate: Partial<Todo>) => {
    if (!isAuthenticated) {
      const updatedTodos = todos.map((todo: Todo) =>
        todo.id === taskId ? { ...todo, ...taskUpdate } : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    } else {
      const updatedData = {
        userId: user.sub,
        taskId: taskId,
        update: taskUpdate,
      };

      try {
        const response = await fetch(`${API_URL}/editTodo`, {
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
    }
    const notificationMessage =
      taskUpdate.completedStatus === true
        ? "Task completed!"
        : taskUpdate.title
        ? "Changes saved."
        : "";
    setNotificationWithTimeout(notificationMessage);
  };

  const moveTask = async (taskId: string, direction: string) => {
    const taskIndex = todos.findIndex((todo) => todo.id === taskId);
    const updatedTodos: Todo[] = [...todos];
    let taskMoved = false;

    if (taskIndex > 0 && direction === "up") {
      [updatedTodos[taskIndex - 1], updatedTodos[taskIndex]] = [
        updatedTodos[taskIndex],
        updatedTodos[taskIndex - 1],
      ];
      taskMoved = true;
    } else if (taskIndex < todos.length - 1 && direction === "down") {
      [updatedTodos[taskIndex], updatedTodos[taskIndex + 1]] = [
        updatedTodos[taskIndex + 1],
        updatedTodos[taskIndex],
      ];
      taskMoved = true;
    }
    setTodos(updatedTodos);

    if (isAuthenticated && taskMoved) {
      const response = await fetch(`${API_URL}/moveTask`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.sub, taskId, direction }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } else {
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      if (!isAuthenticated) {
        setIsLoading(true);
        const localTodos = JSON.parse(localStorage.getItem("todos") || "[]");
        setTodos(localTodos);
        setIsLoading(false);
      } else {
        try {
          setIsLoading(true);
          const response = await fetch(
            `${API_URL}/getTodos?userId=${user.sub}`
          );
          if (!response.ok) {
            setTodos([]);
            throw new Error("Network response was not ok");
          }
          const todos = await response.json();
          setTodos(todos);
        } catch (error) {
          console.error("Fetch todos failed:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchTodos();
  }, [user.sub, isAuthenticated]);

  return (
    <div
      className="w-full p-10 flex relative flex-col items-center gap-5 min-h-screen bg-cover  overflow-x-clip  font-serif
    "
    >
      <div className="flex justify-end w-full">
        {isAuthenticated ? <LogoutButtonAuth0 /> : <LoginButtonAuth0 />}
      </div>
      <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl text-white ">
        To Do List
      </h1>
      <AddTodo onAddTodo={addTodo} />
      {Auth0Loading ? (
        <LoadingSpinner />
      ) : (
        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onEdit={editTodo}
          isLoading={isLoading}
          moveTask={moveTask}
        />
      )}
      <TaskAlert notification={notification} />
    </div>
  );
}
