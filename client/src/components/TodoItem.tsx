import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Trash2, PencilLine, Save, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

type TodoItemProps = {
  id: string;
  title: string;
  completedStatus: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string, taskUpdate: object) => void;
  moveTask: (taskId: string, direction: string) => void;
};

export default function TodoItem({
  id,
  title,
  completedStatus,
  onDelete,
  onEdit,
  moveTask,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(id, { title: editText });
    setIsEditing(false);
  };

  return (
    <div id="entire-todo-item" className="flex w-full  ">
      <div
        id="checkbox-input-label"
        className="flex items-center space-x-2 w-2/3"
      >
        <Checkbox
          id="terms"
          checked={completedStatus}
          onClick={() => onEdit(id, { completedStatus: !completedStatus })}
        />
        {isEditing ? (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          <label
            htmlFor="terms"
            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
              completedStatus ? `line-through` : `none`
            } pointer-events-none break-words min-w-0 leading-normal	`}
          >
            {title}
          </label>
        )}
      </div>
      <div
        id="buttons"
        className={`flex items-center justify-end gap-2 min-w-28 w-fit hover:opacity-100 ${
          isEditing ? "opacity-100" : "opacity-0"
        }`}
      >
        {isEditing ? (
          <Button
            size="icon"
            className="h-8 hover:bg-blue-500 transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300  "
            onClick={() => handleSave()}
          >
            <Save className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            size="icon"
            className="h-8 hover:bg-yellow-500 transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300 "
            onClick={() => handleEditClick()}
          >
            <PencilLine className="h-4 w-4" />
          </Button>
        )}
        <Button
          size="icon"
          className="h-8 hover:bg-red-500 transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300  "
          onClick={() => onDelete(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          className="h-8 transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300 bg-black hover:bg-indigo-500"
          onClick={() => moveTask(id, "up")}
        >
          <ChevronUp className="h-4 w-4" color="white" />
        </Button>
        <Button
          size="icon"
          className="h-8 transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300 bg-black hover:bg-indigo-500"
          onClick={() => moveTask(id, "down")}
        >
          <ChevronDown className="h-4 w-4" color="white" />
        </Button>
      </div>
    </div>
  );
}
