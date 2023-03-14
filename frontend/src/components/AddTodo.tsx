import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Modal, Button, TextInput, Textarea, Group, Box } from "@mantine/core";
import { IconDatabase } from "@tabler/icons-react";
import { ENDPOINT, Todo } from "../App";
import { KeyedMutator } from "swr";

function AddTodo({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
  });

  async function createTodo(value: { title: string; body: string }) {
    const updatedTodos = await fetch(`${ENDPOINT}/api/v1/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    }).then((res) => res.json());

    mutate(updatedTodos);
    form.reset();
    setOpen(false);
  }

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create Todo">
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            mb={12}
            label="Title"
            placeholder="What you want to do?"
            {...form.getInputProps("title")}
          />
          <Textarea
            required
            mb={12}
            label="Body"
            placeholder="Tell me more about it..."
            {...form.getInputProps("body")}
          />
          <Button type="submit">Create Todo</Button>
        </form>
      </Modal>

      <Group position="center">
        <Button
          fullWidth
          mb={12}
          leftIcon={<IconDatabase />}
          variant="filled"
          onClick={() => setOpen(true)}
        >
          Add Todo
        </Button>
      </Group>
    </>
  );
}

export default AddTodo;
