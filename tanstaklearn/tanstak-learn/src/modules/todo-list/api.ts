import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

const BASE_URL = "http://localhost:3000";

export type PaginatedResult<T> = {
  prev: number | null;
  pages: number;
  next: number | null;
  last: number | null;
  items: number;
  data: T[];
};

export type TodoDto = {
  id: string;
  done: boolean;
  title: string;
};

export const todoListApi = {
  getTodoList: async (
    { page }: { page: number },
    { signal }: { signal: AbortSignal }
  ) => {
    const url = `${BASE_URL}/tasks?_page=${page}&_per_page=5`;
    return fetch(url, {
      signal,
    }).then((res) => res.json() as Promise<PaginatedResult<TodoDto>>);
  },

  getTodoListQueryOptions: ({ page }: { page: number }) => {
    return queryOptions({
      queryKey: ["tasks", "list", page],
      queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
    });
  },

  getTodoListInfinityQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ["tasks", "list"],
      queryFn: (meta) =>
        todoListApi.getTodoList({ page: meta.pageParam }, meta),
      initialPageParam: 1,
      getNextPageParam: (res) => res.next,
      select: (res) => res.pages.flatMap((page) => page.data),
    });
  },
};
