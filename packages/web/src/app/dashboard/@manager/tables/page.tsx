import { http } from "@/modules/http";
import { Center } from "@mantine/core";
import { TableEntity } from "@/types/entity";
import { cookies } from "next/headers";
import {ManagerTable} from "@/components/Dashboard/@Manager/ManagerTable"


export const metadata = {
  title: "Manager",
};


export default async function Page() {
  let table: TableEntity[] = [];
  try {
    const res = await http(cookies().get("token")?.value).get(
      "/tables"
    );

    table= res.data;
  } catch (e) {
    return (
      <Center py={64} fz={28} c="red" fw={500}>
        Something went wrong. Please try again later
      </Center>
    );
  }

  return (
    <div>
      <ManagerTable tablelist= {table} />
    </div>
  );


}