"use client";

import Link from "next/link";
import { ReactNode, useEffect } from "react";
import { User } from "@/types/entity";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";
import { usePathname } from "next/navigation";
import {
  AppShell,
  Button,
  Center,
  Container,
  Group,
  Menu,
  Text,
  ActionIcon
} from "@mantine/core";
import { IconUserSquareRounded } from '@tabler/icons-react';

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
    { to: "/dashboard/menus", label: "Menus" },
    { to: "/dashboard/table", label: "Tables" },
    { to: "/dashboard/user", label: "Users" },
  ],

  CHEF: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/orders", label: "Orders" },
  ],
};

const Base = ({
  user,
  children,
  logout,
}: {
  children: ReactNode;
  user: User;
  logout: () => void;
}) => {
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
    <AppShell padding="md" header={{ height: 60 }} >
      <AppShell.Header withBorder style={{ boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)' }}>
        <Group h={60} px={32} justify="space-between" >
          <Text
            fz={24} fw={600}
            variant="gradient"
            gradient={{ from: 'green.7', to: 'lime.5' }}
          >
            RMS
          </Text>

          <Group justify="space-evenly">
            {links[selector(user.role)].map(
              (link: { to: string; label: string }) => (
                <Button
                  key={link.to}
                  component={Link}
                  href={link.to}
                  size="compact-lg"
                  variant="subtle"
                  radius='sm'
                  color={pathname === link.to ? "lime.7" : "gray"}
                >
                  {link.label}
                </Button>
              )
            )}
          </Group>
          <Menu>

            <Menu.Target>
              <ActionIcon variant="subtle" aria-label="Settings" size={42} color="lime.7" radius="xl" >
                <IconUserSquareRounded size={30} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={logout} color="red" fw={900} >Logout</Menu.Item>
            </Menu.Dropdown>

          </Menu>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Container>{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
};

const Fail = () => {
  return (
    <Center py={64} fz={28} c="red" fw={500}>
      Something went wrong. Please try again later
    </Center>
  );
};

export default function Layout({ chef, staff, manager, customer }: Props) {
  const router = useRouter();
  const { user, loggedIn, removeUser } = useUserStore();

  const logout = () => {
    removeUser();
    router.push("/login");
  };

  useEffect(() => {
    if (loggedIn === false) {
      router.push("/login");
    }
  }, [loggedIn, router]);

  if (ROLE.includes(user.role)) {
    return (
      <Base user={user} logout={logout}>
        {user.role === "CHEF" && chef}
        {user.role === "STAFF" && staff}
        {user.role === "MANAGER" && manager}
        {user.role === "CUSTOMER" && customer}
      </Base>
    );
  } else {
    return <Fail />;
  }
}
