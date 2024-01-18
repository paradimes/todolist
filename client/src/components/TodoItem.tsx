import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

// single todo item

type TodoItemProps = {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedData: string) => void;
};

export default function TodoItem({
  id,
  title,
  completed,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(id, editText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center space-x-2 w-full ">
      <Checkbox id="terms" checked={completed} onClick={() => onToggle(id)} />
      {isEditing ? (
        <input
          className="border-2 border-stone-400 rounded-md p-1"
          id="editText"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <label
          htmlFor="terms"
          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
            completed ? `line-through` : `none`
          } pointer-events-none	`}
        >
          {title}
        </label>
      )}
      <div className="flex gap-2">
        <Button className="h-fit " onClick={() => onDelete(id)}>
          Delete
        </Button>
        {isEditing ? (
          <Button className="h-fit " onClick={() => handleSave()}>
            Save
          </Button>
        ) : (
          <Button className="h-fit " onClick={() => handleEditClick()}>
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}
