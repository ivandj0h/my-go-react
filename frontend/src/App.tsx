import useSWR from "swr";
import { Box } from "@mantine/core";
import "./App.css";
import AddTodo from "./components/AddTodo";

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

export const ENDPOINT = "http://localhost:9999";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((res) => res.json());

function App() {
  const { data, mutate } = useSWR<Todo[]>("api/v1/todos", fetcher);

  return (
    <Box>
      <AddTodo mutate={mutate} />
    </Box>
  );
}

export default App;
