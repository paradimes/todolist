import { Trash2, Plus, Check } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
type TaskAlertProps = {
  notification: string | null;
};

export default function TaskAlert({ notification }: TaskAlertProps) {
  return (
    <>
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
    </>
  );
}
