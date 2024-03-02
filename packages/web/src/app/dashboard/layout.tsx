"use client";

import { ReactNode } from "react";
import {
  AppShell,
  Avatar,
  Button,
  Center,
  Container,
  Group,
  Menu,
  Title,
} from "@mantine/core";
import { useUserStore } from "@/store/user";
import { User } from "@/types/entity";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  chef: ReactNode;
  staff: ReactNode;
  manager: ReactNode;
  customer: ReactNode;
};

const ROLE = ["CHEF", "STAFF", "MANAGER", "CUSTOMER"];

const links = {
  MANAGER: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/menu", label: "Menus" },
    { to: "/dashboard/tables", label: "Tables" },
    { to: "/dashboard/users", label: "Users" },
  ],

  CHEF: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/orders", label: "Orders" },
  ],
};

const Base = ({ user, children }: { children: ReactNode; user: User }) => {
  const pathname = usePathname();

  const selector = (role: string) => {
    switch (role) {
      case "MANAGER":
        return "MANAGER";
      case "CHEF":
        return "CHEF";
      default:
        return "MANAGER";
    }
  };

  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header withBorder>
        <Group h={60} px={32} justify="space-between">
          <Title order={1} fz={24} fw={600}>
            RMS
          </Title>
          <Group justify="space-evenly">
            {links[selector(user.role)].map(
              (link: { to: string; label: string }) => (
                <Button
                  key={link.to}
                  component={Link}
                  href={link.to}
                  size="compact-lg"
                  variant="subtle"
                  color={pathname === link.to ? "lime" : "gray"}
                >
                  {link.label}
                </Button>
              )
            )}
          </Group>
          <Menu>
            <Menu.Target>
              <Avatar src={null} radius="xl" size="md" color="lime" />
            </Menu.Target>
            <Menu.Dropdown></Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Container>{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default function Layout({ chef, staff, manager, customer }: Props) {
  const { user } = useUserStore();

  if (ROLE.includes(user.role)) {
    return (
      <Base user={user}>
        {user.role === "CHEF" && chef}
        {user.role === "STAFF" && staff}
        {user.role === "MANAGER" && manager}
        {user.role === "CUSTOMER" && customer}
      </Base>
    );
  } else {
    return (
      <Center py={64} fz={28} c="red" fw={500}>
        Something went wrong. Please try again later
      </Center>
    );
  }
}
