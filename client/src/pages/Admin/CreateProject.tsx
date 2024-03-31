import React from "react";
import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import Draganddrop from "../../components/ui/Draganddrop/Draganddrop";

const CreateProject = () => {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
    validate: {
      title: (value) => value.trim().length < 2,
      description: (value) => value.trim().length === 0,
    },
  });
  return (
    <form onSubmit={form.onSubmit(() => {})} className="text-white">
      <Title
        order={2}
        size="h1"
        style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
        fw={900}
        ta="center"
      >
        Create Room
      </Title>

      <TextInput
        label="Title"
        placeholder="Subject"
        mt="md"
        name="title"
        variant="filled"
        {...form.getInputProps("title")}
      />

      <Draganddrop />

      <Textarea
        mt="md"
        label="Description"
        placeholder="Your message"
        maxRows={10}
        minRows={5}
        autosize
        name="description"
        variant="filled"
        {...form.getInputProps("description")}
      />

      <Group justify="center" mt="xl">
        <Button type="submit" size="md">
          Create Room
        </Button>
      </Group>
    </form>
  );
};

export default CreateProject;
