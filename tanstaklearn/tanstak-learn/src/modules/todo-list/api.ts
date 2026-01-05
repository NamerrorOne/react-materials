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
  baseKey: "tasks",

  getTodoList: async (
    { page }: { page: number },
    { signal }: { signal: AbortSignal }
  ) => {
    const url = `${BASE_URL}/tasks?_page=${page}&_per_page=5`;
    return fetch(url, {
      signal,
    }).then((res) => res.json() as Promise<PaginatedResult<TodoDto>>);
  },

  getTodoListQueryOptions: function ({ page }: { page: number }) {
    return queryOptions({
      queryKey: [this?.baseKey, "list", page],
      queryFn: (meta) =>
        jsonApiInstance(`/tasks?_page=${page}&_per_page=5`, {
          signal: meta.signal,
          json: undefined,
        }),
    });
  },

  getTodoListInfinityQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: [todoListApi.baseKey, "list"],
      queryFn: (meta) =>
        jsonApiInstance<PaginatedResult<TodoDto>>(
          `/tasks?_page=${meta.pageParam}&_per_page=5&_sort=text&_order=asc`,
          {
            signal: meta.signal,
            json: undefined,
          }
        ),
      initialPageParam: 1,
      getNextPageParam: (res) => res.next,
      select: (res) => {
        return res.pages.flatMap((page) => page.data);
      },
    });
  },

  createTodo: (data: TodoDto) => {
    return jsonApiInstance<TodoDto>("/tasks", {
      method: "POST",
      json: data,
    });
  },
  updateTodo: async (data: Partial<TodoDto> & { id: string }) => {
    return jsonApiInstance<TodoDto>(`/tasks/${data.id}`, {
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
