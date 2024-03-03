import { http } from "@/modules/http";
import { Center } from "@mantine/core";
import { Order } from "@/types/entity";
import { cookies } from "next/headers";
import { ChefOrder } from "@/components/Dashboard/ChefOrder";

export const metadata = {
  title: "Chef",
};

export default async function Page() {
  let order: Order[] = [];

  try {
    const res = await http(cookies().get("token")?.value).get(
      "/orders/status/PENDING"
    );

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
      <ChefOrder orders={order} />
    </div>
  );
}
