import type { JSX } from "react";
import type { PaginatedResult, TodoDto } from "../api";
import { ListItem } from "../Todo-lost.styles";

export const ListRender = (
  todoItems: PaginatedResult<TodoDto>
): JSX.Element[] => {
  return todoItems?.data?.map((task) => (
    <ListItem key={task.id}>
      <input type="checkbox" checked={task.done} readOnly />
      {task.title}
    </ListItem>
  ));
};
