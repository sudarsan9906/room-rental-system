import React, { useState } from "react";

import {
  Card,
  Avatar,
  Text,
  Progress,
  Badge,
  Group,
  ActionIcon,
  SimpleGrid,
  Button,
} from "@mantine/core";
import { Link } from "react-router-dom";
// import { MantineLogo } from '@mantinex/mantine-logo';

export default function TaskCard() {
  const [data, setData] = useState([
    {
      id: 1,
      title: "Room in baneshwor",
      description:
        "log  asdasd asdsdasd asdasdasda asdlkasdlasd asda sdasl;dkasldka",
    },
    {
      id: 2,
      title: "Room in dhumbarahi",
      description:
        "logasdasd asdsdasd asdasdasda asdlkasdlasd asda sdasl;dkasldka",
    },
    {
      id: 3,
      title: "Flat in akashedhara",
      description:
        "log asdasd asdsdasd asdasdasda asdlkasdlasd asda sdasl;dkasldka",
    },
  ]);

  const deleteHandler = (id: any) => {
    const deltedItem = data.filter((items) => {
      return items.id !== id;
    });

    setData(deltedItem);
  };

  return (
    <>
      <div className="flex justify-between items-center my-4">
        <h2 className="text-white">List of Rooms</h2>

        <Link to={"/dashboard/admin/projects/createproject"}>
          <Button>Create Room</Button>
        </Link>
      </div>

      {data.length !== 0 ? (
        <SimpleGrid cols={3}>
          {data.map((item) => {
            return (
              <Card withBorder padding="lg" radius="md">
                <Group justify="space-between">
                  {/* <MantineLogo type="mark" size="2rem" /> */}
                  <Badge>12 days left</Badge>
                </Group>

                <Text fz="lg" fw={500} mt="md">
                  {item.title}
                </Text>
                <Text fz="sm" c="dimmed" mt={5}>
                  {item.description}
                </Text>

                <img className="my-3" src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

                {/* <Text c="dimmed" fz="sm" mt="md">
                  Tasks completed:{" "}
                  <Text span fw={500} c="bright">
                    23/36
                  </Text>
                </Text> */}

                {/* <Progress value={(23 / 36) * 100} mt={5} /> */}

                <Group mt={15}>
                    <Link to={"/dashboard/admin/projects/editproject/" + item.id}>
                      <Button variant="light">Edit</Button>
                    </Link>
                  
                  <Button
                    onClick={() => deleteHandler(item.id)}
                    className="text-white bg-red-400"
                  >
                    Delete
                  </Button>
                </Group>
              </Card>
            );
          })}
        </SimpleGrid>
      ) : (
        <h2 className="text-center block">No Projects found!</h2>
      )}
    </>
  );
}
