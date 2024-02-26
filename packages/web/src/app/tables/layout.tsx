"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useCartsStore } from "@/store/carts";
import { usePathname } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { IconShoppingCartFilled } from "@tabler/icons-react";
import {
  ActionIcon,
  AppShell,
  Button,
  CloseButton,
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
  const { carts, remove } = useCartsStore();
  const [opened, handlers] = useDisclosure();

  return (
    <AppShell
      aside={{
        collapsed: {
          mobile: !opened,
          desktop: !opened,
        },
        width: 800,
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
              size="compact-lg"
              variant="subtle"
              color={pathname === "/tables/menus" ? "lime" : "gray"}
            >
              Menus
            </Button>
            <Button
              component={Link}
              href="/tables/orders"
              size="compact-lg"
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
        <Group justify="space-between">
          <Text fz={28} fw={500}>
            Carts
          </Text>
          <CloseButton size="lg" onClick={handlers.close} />
        </Group>
        <Group mt={16}>
          {carts.map((cart) => (
            <Group key={cart.id} justify="space-between">
              <Text>{cart.name}</Text>
              <Text>${cart.price}</Text>
              <Text>{cart.quantity}</Text>
              <Button onClick={() => remove(cart.id)}>Remove</Button>
            </Group>
          ))}
        </Group>
      </AppShell.Aside>
      <AppShell.Main>
        <Container>{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
}
