import { useInfiniteQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";
import { useState } from "react";
import { List, Title, Wrapper } from "./Todo-lost.styles";
import IgorButton from "../../sahred/IgorButton.style";
import { ListRender } from "./components/ListItemConstr";
import { useIntersection } from "./hooks/useIntr";

const TodoList = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const {
    data: todoItems,
    error,
    isLoading,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    enabled,
    ...todoListApi.getTodoListInfinityQueryOptions(),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
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
        {enabled ? "ON" : "OFF"}
      </IgorButton>
      <Title className="">Todo List</Title>
      <List>{ListRender(todoItems)}</List>
      <div ref={cursorRef}>
        {!hasNextPage && "no data for load next"}
        {isFetchingNextPage && "Loading more..."}
      </div>
    </Wrapper>
  );
};

export default TodoList;
