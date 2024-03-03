import React from "react";
import {
  TextInput,
  Group,
  Button,
  Stack,
  Select,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { notifications } from "@mantine/notifications";

const addClient = () => {
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 3
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      return await axios.post("http://localhost:4000/api/users/signup", {
        email: form.values.email,
        name: form.values.name,
        password: form.values.password,
        role: "client",
      });
    },
    mutationKey: ["registerUser"],
    onSuccess: (data) => {
      notifications.show({
        color: "green.3",
        title: "Success",
        message: "client added successfully",
        // icon: <IconCheck />,
      });
      form.reset();
    },
    onError: (error: any) => {
      notifications.show({
        color: "red.3",
        title: "Error occured",
        message: error.message,
        // icon: <IconX />,
      });
    },
  });

  return (
    <>
      <h2 className="mb-4 text-white">Add Client</h2>
      <form onSubmit={form.onSubmit(() => mutate())}>
        <Stack className="text-white">
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />
          <TextInput
            required
            label="Name"
            placeholder="Joe Smith"
            value={form.values.name}
            onChange={(event) =>
              form.setFieldValue("name", event.currentTarget.value)
            }
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Button type="submit" radius="xl">
            Add Client
          </Button>
        </Group>
      </form>
    </>
  );
};

export default addClient;
