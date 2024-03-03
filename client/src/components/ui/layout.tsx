import React from "react";

import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function Layout({ children, logo, Navbar }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className="shadow-md bg-slate-400 flex justify-left items-center px-3 text-white">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>{logo}</div>
      </AppShell.Header>

      <AppShell.Navbar p="md" bg="#eee">
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main bg="#757575">{children}</AppShell.Main>
    </AppShell>
  );
}

export default Layout;
