import { Title , Group } from "@mantine/core";
import { MenusList } from "@/components/Table/MenusList";
import { IconSlice } from "@tabler/icons-react";

export const metadata = {
  title: "Menu",
};

export default async function Page() {
  return (
    <>
      <Group justify="space-between" mt={32} mb={16}>
        <Title order={3} size="h2" fw={900} ta="center" >
          Menus
        </Title>
        <IconSlice stroke={1.5} size={24} />
      </Group>
      <MenusList />
    </>
  );
}
