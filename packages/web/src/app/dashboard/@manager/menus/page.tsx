import { http } from "@/modules/http";
import { Menu } from "@/types/entity";
import { Center } from "@mantine/core";
import { cookies } from "next/headers";
import { ManagerMenus } from "@/components/Dashboard/Manager/ManagerMenus";

export const metadata = {
  title: "Manager",
};

export default async function Page() {
  let menu: Menu[] = [];
  try {
    const res = await http(cookies().get("token")?.value).get("/menus");
    menu = res.data;
  } catch (e) {
    return (
      <Center py={64} fz={28} c="red" fw={500}>
        Something went wrong. Please try again later
      </Center>
    );
  }

  return (
    <div>
      <ManagerMenus food={menu} />
    </div>
  );
}
