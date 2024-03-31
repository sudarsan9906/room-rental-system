import React from "react";
import { TextInput, Group, Button, Stack, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useParams } from "react-router-dom";

const editClient = () => {
  const params = useParams();
  const id = params.id;
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      role: "",
      status: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
    },
  });

  const { data: client, isLoading: isClientLoading } = useQuery({
    queryFn: async () => {
      const response = await axios.get("http://localhost:4000/api/users/" + id);
      return response?.data;
    },

    queryKey: ["getuser"],

    onSuccess: (response) => {
      form.values.email = response.email;
      form.values.name = response.name;
      form.values.role = response.role;
      form.values.status =
        response.status 

      // handleTotalChange(response.data.count);
    },
    onError: () => {
      notifications.show({
        color: "red.3",
        title: "Error occured",
        message: "Cannot get vendor list.",
        // icon: <IconX />,
      });
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      return await axios.patch("http://localhost:4000/api/users/" + id, {
        email: form.values.email,
        name: form.values.name,
        role: form.values.role,
        status: form.values.status,
      });
    },
    mutationKey: ["editUser"],
    onSuccess: (data) => {
      notifications.show({
        color: "green.3",
        title: "Success",
        message: " Edited sucessfully",
        // icon: <IconCheck />,
      });
      queryClient.invalidateQueries("getuser");
      queryClient.invalidateQueries("editUser");
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
  console.log(form.values.status);
  

  return (
    <>
      <h2 className="mb-4 text-white">EditClient</h2>
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
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <Select
            comboboxProps={{ withinPortal: true }}
            data={["client", "admin"]}
            placeholder="Pick one"
            label="Change role"
            onChange={(option) => form.setFieldValue("role", option)}
            value={form.values.role}
            // classNames={classes}
          />

          <Select
            comboboxProps={{ withinPortal: true }}
            data={["Approved", "Not Approved"]}
            placeholder="Pick one"
            label="Client Approval"
            // classNames={classes}
            onChange={(option) =>
              // console.log("asds")

              form.setFieldValue("status", option)
            }
            value={form.values.status}
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Button type="submit" radius="xl">
            Update Client
          </Button>
        </Group>
      </form>
    </>
  );
};

export default editClient;
