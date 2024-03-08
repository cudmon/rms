import { http } from "@/modules/http";
import { Center } from "@mantine/core";
import { cookies } from "next/headers";
import { TableEntity } from "@/types/entity";
import { ReservationList } from "@/components/Dashboard/Customer/ReservationList";

export const metadata = {
  title: "Customer",
};

export default async function Page() {
  let TableList: TableEntity[] = [];

  try {
    const res = await http(cookies().get("token")?.value).get("/tables");

    TableList = res.data;
  } catch (e) {
    return (
      <Center py={64} fz={28} c="red" fw={500}>
        Something went wrong. Please try again later
      </Center>
    );
  }

  return (
    <div>
      <ReservationList table={TableList} />
    </div>
  );
}
