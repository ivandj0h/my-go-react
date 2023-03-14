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

  const createTodo = async (values: { title: string; body: string }) => {
    const updatedTodos = await fetch(`${ENDPOINT}/api/v1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    mutate(updatedTodos, false);
    form.reset();
    setOpen(false);
  };

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
            {...form.getInputProps("title")}
          />
          <Button type="submit">Create Todo</Button>
        </form>
      </Modal>

      <Group position="center">
        <Box>
          <h3>My Go React App</h3>
        </Box>
        <Button
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
