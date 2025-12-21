import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../sahred/api/query-client";
import TodoList from "../modules/todo-list/todo-list";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList></TodoList>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
};
export default App;
