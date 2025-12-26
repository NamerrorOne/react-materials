import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../../sahred/api/api-instance";

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
  text: string;
  userId: string;
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
      queryFn: (meta) =>
        jsonApiInstance(`/tasks?_page=${page}&_per_page=5`, {
          signal: meta.signal,
          json: undefined,
        }),
    });
  },

  getTodoListInfinityQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ["tasks", "list"],
      queryFn: (meta) =>
        jsonApiInstance<PaginatedResult<TodoDto>>(
          `/tasks?_page=${meta.pageParam}&_per_page=5`,
          {
            signal: meta.signal,
            json: undefined,
          }
        ),
      initialPageParam: 1,
      getNextPageParam: (res) => res.next,
      select: (res) => res.pages.flatMap((page) => page.data),
    });
  },

  createTodo: (data: TodoDto) => {
    return jsonApiInstance<TodoDto>("/tasks", {
      method: "POST",
      json: data,
    });
  },
  updateTodo: (id: string, data: Partial<TodoDto>) => {
    return jsonApiInstance<TodoDto>(`/tasks/${id}`, {
      method: "PATCH",
      json: data,
    });
  },
  deleteTodo: (id: string) => {
    return jsonApiInstance(`/tasks/${id}`, {
      method: "DELETE",
      json: null,
    });
  },
};
