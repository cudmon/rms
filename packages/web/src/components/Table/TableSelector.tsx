"use client";

import { useState } from "react";
import { Table } from "@/types/entity";
import { useRouter } from "next/navigation";
import { useTableStore } from "@/store/table";
import { Button, Grid, PinInput, Stack, Title } from "@mantine/core";

type Props = {
  tables: Table[];
};

export const TableSelector = ({ tables }: Props) => {
  const router = useRouter();
  const { setTable } = useTableStore();
  const [passcode, setPasscode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<Table | null>(null);

  const connect = () => {
    setLoading(true);

    if (!selected) {
      return setLoading(false);
    }

    setTable({ ...selected, token: passcode });

    router.push(`/tables/menus`);
  };

  return (
    <Stack py={64} maw={420} gap={32} align="center">
      <Title order={1} fz={32} fw={600}>
        Table Selector
      </Title>
      <Grid>
        {tables.map((table) => (
          <Grid.Col span={4} key={table.id}>
            <Button
              size="xl"
              fullWidth
              key={table.id}
              onClick={() => setSelected(table)}
              color={selected === table ? "blue" : "gray"}
            >
              {table.name}
            </Button>
          </Grid.Col>
        ))}
      </Grid>
      <PinInput length={6} mask size="xl" onComplete={(v) => setPasscode(v)} />
      <Button loading={loading} onClick={connect} size="xl" fullWidth>
        Connect
      </Button>
    </Stack>
  );
};
