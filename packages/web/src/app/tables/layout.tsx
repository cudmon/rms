"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { IconShoppingCartFilled } from "@tabler/icons-react";
import {
  ActionIcon,
  AppShell,
  Button,
  Container,
  Group,
  Text,
  Title,
} from "@mantine/core";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const pathname = usePathname();
  const [opened, handlers] = useDisclosure();

  return (
    <AppShell
      aside={{
        collapsed: {
          mobile: !opened,
          desktop: !opened,
        },
        width: 500,
        breakpoint: "md",
      }}
      padding="md"
      header={{ height: 60 }}
    >
      <AppShell.Header withBorder>
        <Group h={60} px={32} justify="space-between">
          <Title order={1} fz={24} fw={600}>
            RMS
          </Title>
          <Group justify="space-evenly">
            <Button
              component={Link}
              href="/tables/menus"
              size="lg"
              variant="subtle"
              color={pathname === "/tables/menus" ? "lime" : "gray"}
            >
              Menus
            </Button>
            <Button
              component={Link}
              href="/tables/orders"
              size="lg"
              variant="subtle"
              color={pathname === "/tables/orders" ? "lime" : "gray"}
            >
              Orders
            </Button>
          </Group>
          <ActionIcon onClick={handlers.toggle} size="lg">
            <IconShoppingCartFilled />
          </ActionIcon>
        </Group>
      </AppShell.Header>
      <AppShell.Aside p={32}>
        <Text fz={28} fw={500}>
          Carts
        </Text>
        <Text fz={16} color="gray" mt={8}>
          View and manage your carts
        </Text>
      </AppShell.Aside>
      <AppShell.Main>
        <Container>{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
}
