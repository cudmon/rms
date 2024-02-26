"use client";

import { useState } from "react";
import { Table } from "@/types/entity";
import { useRouter } from "next/navigation";
import { Button, Grid, PinInput, Stack, Title } from "@mantine/core";

type Props = {
  tables: Table[];
};

export const TableSelector = ({ tables }: Props) => {
  const router = useRouter();
  const [passcode, setPasscode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<Table | null>(null);

  const connect = () => {
    setLoading(true);

    if (!selected) {
      return setLoading(false);
    }

    localStorage.setItem("table-id", selected.id);
    localStorage.setItem("table-key", "null");

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
