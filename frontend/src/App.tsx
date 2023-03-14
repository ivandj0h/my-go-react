import useSWR from "swr";
import { Box, List, ThemeIcon } from "@mantine/core";
import { CheckCircleFillIcon } from "@primer/octicons-react";
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

  async function markTodoAsDone(id: number) {
    const updatedTodos = await fetch(`${ENDPOINT}/api/v1/todos/${id}/done`, {
      method: "PATCH",
    }).then((res) => res.json());

    mutate(updatedTodos, false);
  }

  return (
    <Box
      sx={(theme) => ({
        padding: "2rem",
        width: "100%",
        maxWidth: "40rem",
        margin: "0 auto",
      })}
    >
      <List spacing="xs" size="sm" mb={12} center>
        {Array.isArray(data)
          ? data?.map((todo) => {
              return (
                <List.Item
                  onClick={() => markTodoAsDone(todo.id)}
                  key={`todo_list__${todo.id}`}
                  icon={
                    todo.done ? (
                      <ThemeIcon color="teal" size={24} radius="xl">
                        <CheckCircleFillIcon size={20} />
                      </ThemeIcon>
                    ) : (
                      <ThemeIcon color="gray" size={24} radius="xl">
                        <CheckCircleFillIcon size={20} />
                      </ThemeIcon>
                    )
                  }
                >
                  {todo.title}
                </List.Item>
              );
            })
          : null}
      </List>

      <AddTodo mutate={mutate} />
    </Box>
  );
}

export default App;
