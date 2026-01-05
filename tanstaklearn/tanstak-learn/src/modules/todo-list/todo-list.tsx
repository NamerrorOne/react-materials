import { List, Title, Wrapper } from "./Todo-lost.styles";
import { ListRender } from "./components/ListItemConstr";
import { useTodoList } from "./hooks/use-todo-list";

import { useCreateTodo } from "./hooks/use-create-todo";
import { useDeleteTodo } from "./hooks/use-delete-todo";
import { useToggleTodo } from "./hooks/use-toggle-todo";

const TodoList = () => {
  const { cursor, todoItems, error, isLoading } = useTodoList();
  const { handleCreate, isPending } = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const { handleToggle } = useToggleTodo();
  console.log("TodoList render");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {(error as Error).message}</div>;
  }

  return (
    <Wrapper $isFetching={false} className="">
      <Title className="">Todo List</Title>
      <form onSubmit={handleCreate}>
        <input type="text" name="text" />
        <button disabled={isPending}>create</button>
      </form>
      <List>
        {ListRender(
          todoItems,
          deleteTodo.handleDelete,
          deleteTodo.isPending,
          handleToggle,
          deleteTodo.deleteVariables
        )}
      </List>
      {cursor}
    </Wrapper>
  );
};

export default TodoList;
