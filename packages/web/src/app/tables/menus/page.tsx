import { http } from "@/modules/http";
import { Menu } from "@/types/entity";
import {
  Badge,
  Button,
  Card,
  CardSection,
  Grid,
  GridCol,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";

export const metadata = {
  title: "Menu",
};

export default async function Page() {
  let menus: Menu[] = [];

  try {
    const res = await http.get("/menus");

    menus = res.data;
  } catch (e) {
    return <div>Failed to load menus</div>;
  }

  return (
    <>
      <Title mt={16} mb={32} ta="center" order={1} fz={32} fw={600}>
        Menu
      </Title>
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
              <Button size="md" fullWidth mt="md">
                Add to cart
              </Button>
            </Card>
          </GridCol>
        ))}
      </Grid>
    </>
  );
}
