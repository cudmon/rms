import { Table, ActionIcon } from "@mantine/core";
import { Box } from "@mantine/core";
import { Card, Center, Button } from "@mantine/core";
import { http } from "@/modules/http";
import { Order, Menu } from "@/types/entity";
import { TableOrder } from "@/components/dashboard/OrderTableList";

export const metadata = {
  title: "Chef",
};

export default async function Page() {
  let order: Order[] = [];

  try {
    const res = await http.get("/orders/status/PENDING");

    order = res.data;
  } catch (e) {
    return (
      <Center py={64} fz={28} c="red" fw={500}>
        Something went wrong. Please try again later
      </Center>
    );
  }

  return (
    <div>
      <TableOrder orders={order} />
    </div>
  );
}
