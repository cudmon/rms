"use client";

import { Cart } from "@/types/entity";
import { http } from "@/modules/http";
import { modals } from "@mantine/modals";
import { useCartsStore } from "@/store/carts";
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
  Button,
} from "@mantine/core";

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

export const CartList = () => {
  const cart = useCartsStore();

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
        cart.remove(id);

        notifications.show({
          title: "Item removed",
          message: "Item was successfully removed from cart",
          color: "blue",
        });
      },
    });

  const order = async () => {
    if (cart.carts.length === 0) {
      notifications.show({
        title: "Error",
        message: "Cart is empty",
        color: "red",
      });

      return;
    }

    try {
      await http.post(
        "/orders",
        cart.carts.map((cart: Cart) => ({
          menuId: cart.menuId,
          quantity: cart.quantity,
        }))
      );

      cart.clear();

      notifications.show({
        title: "Ordered",
        message: "Order was successfully placed",
        color: "blue",
      });
    } catch (e) {
      notifications.show({
        title: "Error",
        message: "Failed to order",
        color: "red",
      });
    }
  };

  return (
    <Box mt={32}>
      {cart.carts.length > 0 ? (
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
              {cart.carts.map((cart) => (
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
      <Button onClick={order} mt={32} fullWidth size="lg">
        Order Now
      </Button>
    </Box>
  );
};
