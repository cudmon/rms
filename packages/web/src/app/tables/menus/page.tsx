import { Title } from "@mantine/core";
import { MenusList } from "@/components/Table/MenusList";

export const metadata = {
  title: "Menu",
};

export default async function Page() {
  return (
    <>
      <Title mt={16} mb={32} ta="center" order={1} fz={32} fw={600}>
        Menu
      </Title>
      <MenusList />
    </>
  );
}
