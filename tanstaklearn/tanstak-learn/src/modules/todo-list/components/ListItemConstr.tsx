import type { JSX } from "react";
import type { TodoDto } from "../api";
import { ListItem } from "../Todo-lost.styles";

export const ListRender = (todoItems: TodoDto[] | undefined): JSX.Element[] => {
  return todoItems
    ? todoItems?.map((task) => (
        <ListItem key={task.id}>
          <input type="checkbox" checked={task.done} readOnly />
          {task.text}
        </ListItem>
      ))
    : [<div key="no-items">No items</div>];
};
