import React from "react";
import { useState } from "react";
import { ActionIcon, Button, Group, Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Link, NavLink } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { notifications } from "@mantine/notifications";

export default function ClientListing() {
  const queryClient = useQueryClient();

  const { data: clientList, isLoading } = useQuery({
    queryFn: async () => {
      const response = await axios.get("http://localhost:4000/api/users");
      return response?.data.filter((user) => user.role === "client");
    },

    queryKey: ["getusers"],

    onSuccess: (response) => {
      console.log(response);

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

  const { mutate: deleteClient, isLoading: isClientDeleted } = useMutation({
    mutationFn: async (id: any) => {
      return await axios.delete(`http://localhost:4000/api/users/${id}`);
    },
    mutationKey: ["deleteClient"],
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("getusers");
      queryClient.invalidateQueries("deleteClient");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const rows = clientList?.map((element, i) => (
    <Table.Tr key={element.name + i} className="text-white">
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>
        {element.status}
      </Table.Td>
      <Table.Td>
        <Group>
          <Link
            to={`/dashboard/admin/clients/edit/${element._id}`}
            className="cursor-pointer text-white hover:text-green-400"
          >
            <ActionIcon color="green">
              <IconEdit size={16} />
            </ActionIcon>
          </Link>

          <ActionIcon color="red" loading={isClientDeleted}>
            <IconTrash size={16} onClick={() => deleteClient(element?._id)} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <div className="flex justify-between items-center my-4">
        <h3 className="text-white">List of Clients</h3>
        <Link to={"/dashboard/admin/clients/addclient"}>
          <Button>Add Clients</Button>
        </Link>
      </div>
      <Table>
        <Table.Thead>
          <Table.Tr className="text-white">
            <Table.Th>S.N</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {clientList?.length !== 0 ? (
          <Table.Tbody>{rows}</Table.Tbody>
        ) : (
          <h2 className="text-center block">No Item found!</h2>
        )}
      </Table>
    </>
  );
}
