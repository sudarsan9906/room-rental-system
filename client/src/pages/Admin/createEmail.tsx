import React from "react";

import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export default function GetInTouchSimple() {
  const form = useForm({
    initialValues: {
      subject: "",
      message: "",
      role: "",
    },
    validate: {
      subject: (value) => value.trim().length === 0,
      message: (value) => value.trim().length === 0,
      role: (value) => value.trim().length === 0,
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
        Create Email
      </Title>

      <Select
        label="Select role"
        placeholder="Pick Role"
        data={["client", "staff"]}
        defaultValue="React"
        clearable
      />

      <TextInput
        label="Subject"
        placeholder="Subject"
        mt="md"
        name="subject"
        variant="filled"
        {...form.getInputProps("subject")}
      />
      <Textarea
        mt="md"
        label="Message"
        placeholder="Your message"
        maxRows={10}
        minRows={5}
        autosize
        name="message"
        variant="filled"
        {...form.getInputProps("message")}
      />

      <Group justify="center" mt="xl">
        <Button type="submit" size="md">
          Send message
        </Button>
      </Group>
    </form>
  );
}
