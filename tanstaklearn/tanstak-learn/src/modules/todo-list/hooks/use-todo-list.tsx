import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "./useIntr";
import { todoListApi } from "../api";

export const useTodoList = () => {
  const {
    data: todoItems,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...todoListApi.getTodoListInfinityQueryOptions(),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const cursor = (
    <div ref={cursorRef}>
      {!hasNextPage && "no data for load next"}
      {isFetchingNextPage && "Loading more..."}
    </div>
  );

  return { todoItems, error, isLoading, cursor };
};
