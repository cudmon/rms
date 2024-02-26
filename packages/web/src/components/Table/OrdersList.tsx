"use client";

import { http } from "@/modules/http";
import { Order, Usage } from "@/types/entity";
import { useEffect, useState } from "react";
import {
  Badge,
  Card,
  Group,
  LoadingOverlay,
  NumberFormatter,
  Stack,
  Table,
  Text,
} from "@mantine/core";

export const OrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const id = localStorage.getItem("table-id");
        const res = await http.get<Usage>(`/usages/active/${id}`);

        setOrders(res.data.order);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    })();
  }, []);

  if (error) {
    return <div>Fail to fetch orders</div>;
  }

  if (loading) {
    return <LoadingOverlay visible />;
  }

  return (
    <Stack gap={32}>
      <Card shadow="sm" p={0} withBorder>
        <Table
          fz={16}
          verticalSpacing="lg"
          highlightOnHover
          horizontalSpacing="lg"
        >
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
                  <NumberFormatter prefix="$" value={order.price} />
                </Table.Td>
                <Table.Td>
                  <Badge>{order.status}</Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
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
    </Stack>
  );
};
