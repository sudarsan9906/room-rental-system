import React from "react";

import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "react-query";
import { notifications } from "@mantine/notifications";
// import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Checkbox,
  Anchor,
  Stack,
  Divider,
} from "@mantine/core";

export default function Login(props: PaperProps) {
  const navigate = useNavigate();

  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      phoneno: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 3
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const { mutate: login, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      return await axios.post("http://localhost:4000/api/users/login", {
        email: form.values.email,
        password: form.values.password,
      });
    },
    mutationKey: ["loginUser"],
    onSuccess: (data) => {
      notifications.show({
        color: "green.3",
        title: "Success",
        message: "login sucessfully.",
        // icon: <IconCheck />,
      });

      if (data.data.role === "client") {
        return navigate("/dashboard/client");
      } else if (data.data.role === "admin") {
        return navigate("/dashboard/admin/staffs");
      } else if (data.data.role === "staff") {
        return navigate("/dashboard/staff");
      } else {
        return navigate("/dashboard/projectteam");
      }
    },
    onError: (error: any) => {
      console.log(error);

      notifications.show({
        color: "red.3",
        title: "Error occured",
        message: error.response.data.message,
        // icon: <IconX />,
      });
    },
  });

  const { mutate: signup, isLoading: isSignupLoading } = useMutation({
    mutationFn: async (data: any) => {
      return await axios.post("http://localhost:4000/api/users/signup", {
        email: form.values.email,
        password: form.values.password,
        name: form.values.name,
        phoneno: form.values.phoneno,
      });
    },
    mutationKey: ["registerUser"],
    onSuccess: (data) => {
      notifications.show({
        color: "green.3",
        title: "Success",
        message: "registration sucessfully! please wait for the verification.",
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
    <div className="h-[100vh] flex justify-center items-center bg-[#757575] px-3">
      <Paper
        radius="md"
        p="xl"
        maw={400}
        mx="auto"
        // mt={100}
        withBorder
        {...props}
        className="bg-[#eee]"
      >
        <Text size="lg" fw={500}>
          Welcome to Knowledge Management System, {type} with
        </Text>

        <Divider label="" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit(() =>
            type === "login" ? login() : signup()
          )}
        >
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
            )}

            {type === "register" && (
              <TextInput
                label="Phone Number"
                placeholder="Your Phone Number"
                value={form.values.phoneno}
                onChange={(event) =>
                  form.setFieldValue("phoneno", event.currentTarget.value)
                }
                radius="md"
              />
            )}

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

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
