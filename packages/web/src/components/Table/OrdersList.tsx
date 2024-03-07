"use client";

import Link from "next/link";
import { AxiosError } from "axios";
import { http } from "@/modules/http";
import { Order } from "@/types/entity";
import { useTableStore } from "@/store/table";
import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import {
  Badge,
  Button,
  Card,
  Center,
  Group,
  NumberFormatter,
  Skeleton,
  Stack,
  Table,
  Text,
} from "@mantine/core";

const Total = ({ orders }: { orders: Order[] }) => {
  return (
    <Card shadow="sm" withBorder>
      <Group justify="space-between">
        <Text fz={28} fw={500}>
          Total:
        </Text>
        <Text c="lime" fz={28} fw={500}>
          <NumberFormatter
            prefix="$"
            value={orders.reduce((acc, o) => acc + o.price * o.quantity, 0)}
          />
        </Text>
      </Group>
    </Card>
  );
};

const Empty = () => {
  return (
    <Card shadow="sm" padding="xl" withBorder>
      <Center>
        <Stack gap={64}>
          <Text fz={48} fw={400}>
            No orders yet
          </Text>
          <Button
            color="lime"
            variant="outline"
            size="lg"
            component={Link}
            href="/tables/menus"
          >
            Order now
          </Button>
        </Stack>
      </Center>
    </Card>
  );
};

const Fail = () => {
  return (
    <Card shadow="sm" padding="xl" withBorder>
      <Center fz={28} c="red" fw={500}>
        Something went wrong. Please try again later
      </Center>
    </Card>
  );
};

const List = ({ orders }: { orders: Order[] }) => {
  return (
    <Card shadow="sm" p={0} withBorder>
      <Table fz={16} verticalSpacing="lg" horizontalSpacing="lg">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {orders.map((order) => (
            <Table.Tr key={order.id}>
              <Table.Td>{order.menu.name}</Table.Td>
              <Table.Td>{order.quantity}</Table.Td>
              <Table.Td>
                <NumberFormatter
                  prefix="$"
                  value={order.price * order.quantity}
                />
              </Table.Td>
              <Table.Td>
                <Badge>{order.status}</Badge>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
};

export const OrdersList = () => {
  const { table } = useTableStore();

  const { isPending, isError, data } = useQuery({
    queryKey: ["orders", table.id],
    queryFn: async () => {
      try {
        if (!table.id) return [];

        const response = await http().get(`/usages/active/${table.id}`);

        return response.data.order as Order[];
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            return [];
          }
        }

        notifications.show({
          title: "Error",
          message: "Something went wrong. Please try again later",
          color: "red",
        });
      }
    },
  });

  return (
    <Stack gap={32}>
      {isPending ? (
        <>
          <Skeleton visible={isPending} height={200} />
          <Skeleton visible={isPending} height={100} />
        </>
      ) : isError ? (
        <Fail />
      ) : data?.length === 0 ? (
        <Empty />
      ) : data ? (
        <>
          <List orders={data} />
          <Total orders={data} />
        </>
      ) : null}
    </Stack>
  );
};
