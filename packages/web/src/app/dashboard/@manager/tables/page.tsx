import { http } from "@/modules/http";
import { Center } from "@mantine/core";
import { TableEntity } from "@/types/entity";
import { cookies } from "next/headers";
import { ManagerTable } from "@/components/Dashboard/Manager/ManagerTable";

export const metadata = {
  title: "Manager",
};

export default async function Page() {
  return (
    <div>
      <ManagerTable />
    </div>
  );
}
