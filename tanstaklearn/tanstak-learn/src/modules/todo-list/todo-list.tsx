import { useMutation, useQueryClient } from "@tanstack/react-query";
import { List, Title, Wrapper } from "./Todo-lost.styles";
import { ListRender } from "./components/ListItemConstr";
import { useTodoList } from "./hooks/use-todo-list";
import { todoListApi } from "./api";

const TodoList = () => {
  const { cursor, todoItems, error, isLoading } = useTodoList();
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", "list"] });
    },
  });

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const text = String(formData.get("text"));

    createTodoMutation.mutate({
      id: Math.random().toString(),
      done: false,
      text: text,
      userId: "1",
    });
    console.log("Create todos item:", text);
  };

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
        <button>create</button>
      </form>
      <List>{ListRender(todoItems)}</List>
      {cursor}
    </Wrapper>
  );
};

export default TodoList;
