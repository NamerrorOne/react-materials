import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { todoListApi, type PaginatedResult, type TodoDto } from "../api";

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: todoListApi.updateTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({
        queryKey: [todoListApi.baseKey],
      });

      const previousTodos = queryClient.getQueryData(
        todoListApi.getTodoListInfinityQueryOptions().queryKey
      );

      queryClient.setQueryData<InfiniteData<PaginatedResult<TodoDto>>>(
        todoListApi.getTodoListInfinityQueryOptions().queryKey,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((todo) =>
                todo.id === newTodo.id ? { ...todo, ...newTodo } : todo
              ),
            })),
          };
        }
      );

      return { previousTodos };
    },
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(
          todoListApi.getTodoListInfinityQueryOptions().queryKey,
          context.previousTodos
        );
      }
    },

    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] }),
  });

  const handleToggle = (id: string, done: boolean) => {
    updateTodoMutation.mutate({
      id: id,
      done: !done,
    });
  };

  return {
    handleToggle,
  };
};
