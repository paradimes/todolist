import { Trash2, CheckSquare, PlusSquare, Save } from "lucide-react";
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
          className="text-green-500 bg-white bg-transparent border-[1px] border-green-700"
        >
          <PlusSquare className="h-4 w-4" color="#22c55e" />
          <AlertTitle>Task added.</AlertTitle>
        </Alert>
      ) : notification === "Task deleted." ? (
        <Alert variant={"destructive"}>
          <Trash2 className="h-4 w-4" />
          <AlertTitle>{notification}</AlertTitle>
        </Alert>
      ) : notification === "Changes saved." ? (
        <Alert
          variant={"default"}
          className="text-yellow-500 bg-white bg-transparent border-[1px] border-yellow-700"
        >
          <Save className="h-4 w-4" color="#eab308" />
          <AlertTitle>{notification}</AlertTitle>
        </Alert>
      ) : (
        notification === "Task completed!" && (
          <Alert
            variant={"default"}
            className="text-lime-500 bg-white bg-transparent border-[1px] border-lime-700"
          >
            <CheckSquare className="h-4 w-4" color="#84cc16" />
            <AlertTitle>Task completed!</AlertTitle>
          </Alert>
        )
      )}
    </div>
  );
}
