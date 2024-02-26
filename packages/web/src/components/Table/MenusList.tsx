"use client";

import { Menu } from "@/types/entity";
import { useCartsStore } from "@/store/carts";
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
  const { add } = useCartsStore();

  return (
    <Grid grow gutter={32}>
      {menus.map((menu) => (
        <GridCol span={{ base: 12, sm: 4, md: 3 }} key={menu.id}>
          <Card shadow="sm" pt={0} withBorder>
            <CardSection>
              <Image
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
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
              <NumberInput defaultValue={1} min={1} max={10} />
              <Button
                fullWidth
                onClick={() =>
                  add({
                    id: menu.id,
                    name: menu.name,
                    price: menu.price,
                    quantity: 1,
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
