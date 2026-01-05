import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "../api";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] });
      console.log("Todo created and queries invalidated");
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
  };

  return {
    handleCreate,
    isPending: createTodoMutation.isPending,
  };
};
