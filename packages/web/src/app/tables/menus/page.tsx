import { http } from "@/modules/http";
import { Menu } from "@/types/entity";
import { Title } from "@mantine/core";
import { MenusList } from "@/components/Table/MenusList";

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
      <MenusList menus={menus} />
    </>
  );
}
