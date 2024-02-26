"use client";

import { Cart } from "@/types/entity";
import { Group, Button, Text } from "@mantine/core";

type Props = {
  carts: Cart[];
  remover: (id: string) => void;
};

export const CartList = ({ carts, remover }: Props) => {
  return (
    <Group mt={16}>
      {carts.map((cart) => (
        <Group key={cart.id} justify="space-between">
          <Text>{cart.name}</Text>
          <Text>${cart.price}</Text>
          <Text>{cart.quantity}</Text>
          <Button onClick={() => remover(cart.id)}>Remove</Button>
        </Group>
      ))}
    </Group>
  );
};
