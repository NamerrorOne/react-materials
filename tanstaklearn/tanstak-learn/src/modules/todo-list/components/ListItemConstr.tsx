import type { JSX } from "react";
import type { TodoDto } from "../api";
import { ListItem } from "../Todo-lost.styles";

export const ListRender = (
  todoItems: TodoDto[] | undefined,
  onDelete: (id: string) => void,
  isPending: boolean,
  toggleTodo: (id: string, done: boolean) => void,
  deleteVariables?: string
): JSX.Element[] => {
  return todoItems
    ? todoItems?.map((task) => (
        <ListItem key={task.id}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleTodo(task.id, task.done)}
          />
          {task.text}
          <button
            disabled={isPending && deleteVariables === task.id}
            onClick={() => onDelete(task.id)}
          >
            delete todo
          </button>
        </ListItem>
      ))
    : [<div key="no-items">No items</div>];
};
