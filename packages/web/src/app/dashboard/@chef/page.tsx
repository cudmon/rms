import { http } from "@/modules/http";
import { Center } from "@mantine/core";
import { Order } from "@/types/entity";
import { cookies } from "next/headers";
import { ChefOrder } from "@/components/Dashboard/Chef/ChefOrder";

export const metadata = {
  title: "Chef",
};

export default async function Page() {

  return (
    <div>
      <ChefOrder />
    </div>
  );
}
