import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// single todo item

type TodoItemProps = {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoItem({
  id,
  title,
  completed,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <div className="flex items-center space-x-2 w-full ">
      <Checkbox id="terms" checked={completed} onClick={() => onToggle(id)} />
      <label
        htmlFor="terms"
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
          completed ? `line-through` : `none`
        } pointer-events-none	`}
      >
        {title}
      </label>
      <div>
        <Button className="h-fit " onClick={() => onDelete(id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
