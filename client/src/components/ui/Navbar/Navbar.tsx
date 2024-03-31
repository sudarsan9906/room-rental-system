import React from "react";

import {
  Group,
  Button,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  useMantineTheme,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

import classes from "./HeaderMegaMenu.module.css";

export default function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <h3 className="text-white">Room Rental</h3>

          <Group visibleFrom="sm">
            <Button variant="default">Add Property</Button>
            <Button>Login</Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Room Rental"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Add Property</Button>
            <Button>Login</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
