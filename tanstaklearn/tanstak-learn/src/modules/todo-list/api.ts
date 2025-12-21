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
};
