import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";
import { List, Title, Wrapper } from "./Todo-lost.styles";
import IgorButton from "../../sahred/IgorButton.style";
import { useState } from "react";
import { ListRender } from "./components/ListItemConstr";

const TodoList = () => {
  const [page, setPage] = useState<number>(1);
  const [enabled, setEnabled] = useState<boolean>(false);
  const {
    data: todoItems,
    error,
    isLoading,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["tasks", "list", { page }],
    queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
    placeholderData: keepPreviousData,
    enabled: enabled,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {(error as Error).message}</div>;
  }

  return (
    <Wrapper $isFetching={isPlaceholderData} className="">
      <IgorButton onClick={() => setEnabled((e) => !e)}>
        {enabled ? "Disable Fetching" : "Enable Fetching"}
      </IgorButton>
      <Title className="">Todo List</Title>
      <List>{ListRender(todoItems)}</List>
      <IgorButton
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(p - 1, 0))}
      >
        {"<- Prev"}
      </IgorButton>
      <IgorButton
        onClick={() => setPage((p) => Math.min(p + 1, todoItems?.pages || 0))}
      >
        {"Next ->"}
      </IgorButton>
    </Wrapper>
  );
};

export default TodoList;
