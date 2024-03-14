import { http } from "@/modules/http";
import { Center } from "@mantine/core";
import { cookies } from "next/headers";
import { TableEntity,Order } from "@/types/entity";
import { TableStaff } from "@/components/Dashboard/Staff/StaffTable" ;

export const metadata = {
  title: "Staff",
};

export default async function Page() {

  return (
    <div>
      <TableStaff />

    </div>
  );
}
