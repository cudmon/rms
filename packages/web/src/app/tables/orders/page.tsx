import { Title } from "@mantine/core";
import { OrdersList } from "@/components/Table/OrdersList";

export const metadata = {
  title: "Order",
};

export default async function Page() {
  return (
    <>
      <Title mt={16} mb={32} ta="center" order={1} fz={32} fw={600}>
        Your Orders
      </Title>
      <OrdersList />
    </>
  );
}
