"use client";

import { Cart } from "@/types/entity";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import {
  Table,
  ActionIcon,
  Card,
  Center,
  Stack,
  Text,
  Box,
} from "@mantine/core";

type Props = {
  carts: Cart[];
  remover: (id: string) => void;
};

const Empty = () => {
  return (
    <Card shadow="sm" padding="xl" withBorder>
      <Center>
        <Stack gap={64}>
          <Text fz={36} fw={400}>
            No items in cart
          </Text>
        </Stack>
      </Center>
    </Card>
  );
};

export const CartList = ({ carts, remover }: Props) => {
  const remove = (id: string) =>
    modals.openConfirmModal({
      title: (
        <Text fz={18} fw={500}>
          Remove item
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
        <Text>Are you sure you want to remove this item from cart?</Text>
      ),

      onConfirm: async () => {
        remover(id);

        notifications.show({
          title: "Item removed",
          message: "Item was successfully removed from cart",
          color: "blue",
        });
      },
    });

  return (
    <Box mt={32}>
      {carts.length > 0 ? (
        <Card withBorder>
          <Table
            fz={18}
            verticalSpacing="lg"
            horizontalSpacing="lg"
            highlightOnHover
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Item</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th ta="center">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {carts.map((cart) => (
                <Table.Tr key={cart.id}>
                  <Table.Td>{cart.name}</Table.Td>
                  <Table.Td>{cart.quantity}</Table.Td>
                  <Table.Td>{cart.price}</Table.Td>
                  <Table.Td ta="center">
                    <ActionIcon
                      color="red"
                      radius="xl"
                      size="lg"
                      onClick={() => remove(cart.id)}
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>
      ) : (
        <Empty />
      )}
    </Box>
  );
};
