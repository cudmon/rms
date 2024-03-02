import { http } from "@/modules/http";
import { Menu } from "@/types/entity";
import { cookies } from "next/headers";
import { Center, Title } from "@mantine/core";
import { MenusList } from "@/components/Table/MenusList";

export const metadata = {
  title: "Menu",
};

export default async function Page() {
  let menus: Menu[] = [];

  try {
    const res = await http(cookies().get("auth-token")?.value).get("/menus");

    menus = res.data;
  } catch (e) {
    return (
      <Center py={64} fz={28} c="red" fw={500}>
        Something went wrong. Please try again later
      </Center>
    );
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
