import { http } from "@/modules/http";
import { Table } from "@/types/entity";
import { Center, Stack } from "@mantine/core";
import { TableSelector } from "@/components/TableSelector";

export const metadata = {
  title: "Table Selector",
};

export default async function Page() {
  let tables: Table[] = [];

  try {
    const res = await http.get("/tables");

    tables = res.data;
  } catch (e) {
    return <div>Failed to load tables</div>;
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
