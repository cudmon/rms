"use client";

import { useState } from "react";
import { API_URL } from "@/constants";
import { Cart, Menu } from "@/types/entity";
import { useCartsStore } from "@/store/carts";
import { notifications } from "@mantine/notifications";
import {
  Grid,
  GridCol,
  Card,
  CardSection,
  Group,
  Badge,
  Button,
  Image,
  Text,
  NumberInput,
  Flex,
} from "@mantine/core";

type Props = {
  menus: Menu[];
};

export const MenusList = ({ menus }: Props) => {
  const carts = useCartsStore();
  const [quantitys, setQuantitys] = useState<Map<string, number>>(new Map());

  const add = (item: Cart) => {
    carts.add(item);

    notifications.show({
      title: "Added to cart",
      message: `${item.quantity}x ${item.name} added to cart`,
      color: "teal",
    });
  };

  return (
    <Grid gutter={16}>
      {menus.map((menu) => (
        <GridCol span={{ base: 12, sm: 4 }} key={menu.id}>
          <Card shadow="sm" pt={0} withBorder>
            <CardSection>
              <Image
                src={`${API_URL}/menus/${menu.id}/image`}
                height={160}
                alt="Norway"
              />
            </CardSection>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fz={24} fw={500}>
                {menu.name}
              </Text>
              <Badge size="lg" variant="light">
                ${menu.price}
              </Badge>
            </Group>
            <Flex gap={8} align="center" justify="space-between">
              <NumberInput
                defaultValue={1}
                min={1}
                max={10}
                onChange={(value) => {
                  setQuantitys((prev) =>
                    new Map(prev).set(menu.id, Number(value))
                  );
                }}
              />
              <Button
                fullWidth
                onClick={() =>
                  add({
                    id: menu.id,
                    name: menu.name,
                    price: menu.price * (quantitys.get(menu.id) || 1),
                    quantity: quantitys.get(menu.id) || 1,
                  })
                }
              >
                Add to cart
              </Button>
            </Flex>
          </Card>
        </GridCol>
      ))}
    </Grid>
  );
};
