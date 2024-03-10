import { http } from "@/modules/http";
import { Center } from "@mantine/core";
import { cookies } from "next/headers";
import { TableEntity,Order } from "@/types/entity";
import { TableStaff } from "@/components/Dashboard/Staff/StaffTable";

export const metadata = {
  title: "Staff",
};

export default async function Page() {
  let TableList: TableEntity[] = [];
  let orders: Order[] = [];
  try {
    const resTable = await http(cookies().get("token")?.value).get("/tables");
    const resOrder = await http(cookies().get("token")?.value).get("/orders")
    TableList = resTable.data;
    orders = resOrder.data;
  } catch (e) {
    return (
      <Center py={64} fz={28} c="red" fw={500}>
        Something went wrong. Please try again later
      </Center>
    );
  }

  return (
    <div>
      <TableStaff table={TableList} order={orders} />

    </div>
  );
}
