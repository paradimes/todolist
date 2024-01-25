import { Trash2, CheckSquare, PlusSquare } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
type TaskAlertProps = {
  notification: string | null;
};

export default function TaskAlert({ notification }: TaskAlertProps) {
  return (
    <div className="flex w-[448px]">
      {notification === "Task added." ? (
        <Alert
          variant={"default"}
          className="text-sky-500 bg-white bg-transparent border-[1px] border-sky-700"
        >
          <PlusSquare className="h-4 w-4" color="#0ea5e9" />
          <AlertTitle>Task added.</AlertTitle>
        </Alert>
      ) : notification === "Task deleted." ? (
        <Alert variant={"destructive"}>
          <Trash2 className="h-4 w-4" />
          <AlertTitle>{notification}</AlertTitle>
        </Alert>
      ) : (
        notification === "Task completed!" && (
          <Alert
            variant={"default"}
            className="text-green-500 bg-white bg-transparent border-[1px] border-green-700"
          >
            <CheckSquare className="h-4 w-4" color="#22c55e" />
            <AlertTitle className="text-green-500">Task completed!</AlertTitle>
          </Alert>
        )
      )}
    </div>
  );
}
