import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { todoListApi, type TodoDto, type PaginatedResult } from "../api";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,

    onSuccess: (_, deletedId) => {
      const queryKey = todoListApi.getTodoListInfinityQueryOptions().queryKey;
      const oldData =
        queryClient.getQueryData<InfiniteData<PaginatedResult<TodoDto>>>(
          queryKey
        );

      if (oldData) {
        queryClient.setQueryData<InfiniteData<PaginatedResult<TodoDto>>>(
          queryKey,
          (old) => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                data: page.data.filter((todo) => todo.id !== deletedId),
              })),
            };
          }
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] });
    },
  });

  const handleDelete = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  return {
    handleDelete,
    isPending: deleteTodoMutation.isPending,
    deleteVariables: deleteTodoMutation.variables,
  };
};
