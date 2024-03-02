"use client";

import Link from "next/link";
import { AxiosError } from "axios";
import { http } from "@/modules/http";
import { modals } from "@mantine/modals";
import { useEffect, useState } from "react";
import { Order, Usage } from "@/types/entity";
import { useTableStore } from "@/store/table";
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
            value={orders.reduce((acc, order) => acc + order.price, 0)}
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

const List = ({
  orders,
  cancel,
}: {
  orders: Order[];
  cancel: (id: string) => void;
}) => {
  return (
    <Card shadow="sm" p={0} withBorder>
      <Table fz={16} verticalSpacing="lg" horizontalSpacing="lg">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {orders.map((order) => (
            <Table.Tr key={order.id}>
              <Table.Td>{order.menu.name}</Table.Td>
              <Table.Td>{order.quantity}</Table.Td>
              <Table.Td>
                <NumberFormatter prefix="$" value={order.price} />
              </Table.Td>
              <Table.Td>
                <Badge>{order.status}</Badge>
              </Table.Td>
              <Table.Td>
                <Button
                  size="compact-sm"
                  color="red"
                  variant="subtle"
                  onClick={() => cancel(order.id)}
                >
                  Cancel
                </Button>
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
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        if (!table.id) {
          return;
        }

        const res = await http().get<Usage>(`/usages/active/${table.id}`);

        setLoading(false);
        setOrders(res.data.order);
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.status === 404) {
            setOrders([]);
            setLoading(false);
            return;
          }
        }

        setError(true);
        setLoading(false);
      }
    })();
  }, [table.id]);

  useEffect(() => {
    if (error) {
      notifications.show({
        title: "Error",
        message: "Failed to fetch orders",
        color: "red",
      });
    }
  }, [error]);

  const cancel = async (id: string) =>
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

      children: (
        <Text>
          Are you sure you want to cancel this order? This action is
          irreversible
        </Text>
      ),

      onConfirm: async () => {
        try {
          notifications.show({
            title: "Order canceled",
            message: "Order was successfully canceled",
            color: "blue",
          });

          setOrders(orders.filter((order) => order.id !== id));
        } catch (e) {
          notifications.show({
            title: "Error",
            message: "Failed to cancel order",
            color: "red",
          });
        }
      },
    });

  return (
    <Stack gap={32}>
      {loading ? (
        <>
          <Skeleton visible={loading} height={200} />
          <Skeleton visible={loading} height={100} />
        </>
      ) : error ? (
        <Fail />
      ) : orders.length === 0 ? (
        <Empty />
      ) : (
        <>
          <List orders={orders} cancel={cancel} />
          <Total orders={orders} />
        </>
      )}
    </Stack>
  );
};
