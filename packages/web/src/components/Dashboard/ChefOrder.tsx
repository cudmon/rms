"use client";

import { Order } from "@/types/entity";

import {
  Badge,
  Card,
  Center,
  Container,
  NumberFormatter,
  Table,
  Text,
  ActionIcon,
  Tooltip,
} from "@mantine/core";

import { http } from "@/modules/http";

import { IconX, IconCheck } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

export const TableOrder = ({ orders }: { orders: Order[] }) => {
  const finish = (id: string) => {
    const res = http.patch(`/orders/finish/${id}`);
  };

  const cancel = (id: string) => {
    modals.openConfirmModal({
      title: (
        <Text fz={18} fw={500}>
          Cancel Order
        </Text>
      ),

      centered: true,

      labels: {
        confirm: "Confirm",
        cancel: "Cancel",
      },

      confirmProps: {
        color: "red",
      },

      children: <Text>Are you sure you want to cancel this order?</Text>,

      onConfirm: async () => {
        const res = http.patch(`/orders/cancel/${id}`);
      },
    });
  };

  if (!orders.length) {
    return (
      <Center py={64} fz={28} c="red" fw={500}>
        No order available
      </Center>
    );
  }

  const row = orders.map((order) => (
    <Table.Tr key={order.id} ta="center">
      <Table.Td>{order.menu.name}</Table.Td>
      <Table.Td>{order.quantity}</Table.Td>
      <Table.Td>
        <NumberFormatter prefix="$" value={order.price} />
      </Table.Td>
      <Table.Td>
        <Badge>{order.status}</Badge>
      </Table.Td>
      <Table.Td>
        <Tooltip label="Finish">
          <ActionIcon
            radius="sm"
            color="green"
            title="Finish"
            onClick={() => finish(order.id)}
          >
            <IconCheck />
          </ActionIcon>
        </Tooltip>
        &nbsp;
        <Tooltip label="Cancel">
          <ActionIcon
            radius="sm"
            color="red"
            title="Cancel"
            onClick={() => cancel(order.id)}
          >
            <IconX />
          </ActionIcon>
        </Tooltip>
      </Table.Td>
    </Table.Tr>
  ));

  const head = (
    <Table.Tr>
      <Table.Th ta="center">Menu</Table.Th>
      <Table.Th ta="center">Quantity</Table.Th>
      <Table.Th ta="center">Price</Table.Th>
      <Table.Th ta="center">Status</Table.Th>
      <Table.Th ta="center">Action</Table.Th>
    </Table.Tr>
  );

  return (
    <Container>
      <Card shadow="sm" padding="md" radius="md" withBorder mt="sm">
        <Table stickyHeader highlightOnHover verticalSpacing="sm">
          <Table.Thead>{head}</Table.Thead>
          <Table.Tbody>{row}</Table.Tbody>
        </Table>
      </Card>
    </Container>
  );
};
