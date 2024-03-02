import { http } from "@/modules/http";
import { cookies } from "next/headers";
import { Table } from "@/types/entity";
import { Center, Stack } from "@mantine/core";
import { TableSelector } from "@/components/Table/TableSelector";

export const metadata = {
  title: "Table Selector",
};

export default async function Page() {
  let tables: Table[] = [];

  try {
    const res = await http(cookies().get("token")?.value).get("/tables");

    tables = res.data;
  } catch (e) {
    return (
      <Center py={64} fz={28} c="red" fw={500}>
        Something went wrong. Please try again later
      </Center>
    );
  }

  return (
    <>
      <Center>
        <Stack align="center">
          <TableSelector tables={tables} />
        </Stack>
      </Center>
    </>
  );
}
