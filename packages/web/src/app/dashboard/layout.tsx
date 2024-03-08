"use client";

import Link from "next/link";
import { User } from "@/types/entity";
import { http } from "@/modules/http";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IconUserSquareRounded } from "@tabler/icons-react";
import {
  AppShell,
  Button,
  Container,
  Group,
  Menu,
  Text,
  ActionIcon,
} from "@mantine/core";

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
    { to: "/dashboard/tables", label: "Tables" },
    { to: "/dashboard/users", label: "Users" },
  ],

  CHEF: [{ to: "/dashboard", label: "Dashboard" }],

  STAFF: [{ to: "/dashboard", label: "Dashboard" }],

  CUSTOMER: [{ to: "/dashboard", label: "Dashboard" }],
};

const Base = ({
  user,
  children,
  logout,
}: {
  children: ReactNode;
  user: Pick<User, "role">;
  logout: () => void;
}) => {
  const pathname = usePathname();

  const selector = (role: string) => {
    switch (role) {
      case "MANAGER":
        return "MANAGER";
      case "CHEF":
        return "CHEF";
      case "STAFF":
        return "STAFF";
      case "CUSTOMER":
        return "CUSTOMER";
      default:
        return "CUSTOMER";
    }
  };

  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header
        withBorder
        style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
      >
        <Group h={60} px={32} justify="space-between">
          <Text
            fz={24}
            fw={600}
            variant="gradient"
            gradient={{ from: "green.7", to: "lime.5" }}
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
                  radius="sm"
                  color={pathname === link.to ? "lime.7" : "gray"}
                >
                  {link.label}
                </Button>
              )
            )}
          </Group>
          <Menu>
            <Menu.Target>
              <ActionIcon
                variant="subtle"
                aria-label="Settings"
                size={42}
                color="lime.7"
                radius="xl"
              >
                <IconUserSquareRounded size={30} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={logout} color="red" fw={900}>
                Logout
              </Menu.Item>
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

export default function Layout({ chef, staff, manager, customer }: Props) {
  const router = useRouter();
  const { user, loggedIn, removeUser } = useUserStore();

  const logout = () => {
    removeUser();
    router.push("/login");
  };

  useEffect(() => {
    if (loggedIn) {
      (async () => {
        try {
          await http().get("/auth/check-session");
        } catch (error) {
          removeUser();
          router.push("/login");
        }
      })();
    } else {
      router.push("/login");
    }
  }, [loggedIn, removeUser, router]);

  if (ROLE.includes(user.role)) {
    return (
      <Base user={user} logout={logout}>
        {user.role === "CHEF" && chef}
        {user.role === "STAFF" && staff}
        {user.role === "MANAGER" && manager}
        {user.role === "CUSTOMER" && customer}
      </Base>
    );
  }
}
