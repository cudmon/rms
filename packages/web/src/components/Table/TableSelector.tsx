"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { http } from "@/modules/http";
import { Table } from "@/types/entity";
import { useRouter } from "next/navigation";
import { useTableStore } from "@/store/table";
import { notifications } from "@mantine/notifications";
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

  const connect = async () => {
    setLoading(true);

    if (!selected) {
      notifications.show({
        title: "Table is required",
        message: "Please select a table",
        color: "red",
      });

      return setLoading(false);
    }

    if (!passcode || passcode.length < 6) {
      notifications.show({
        title: "Passcode is required",
        message: "Please enter passcode",
        color: "red",
      });

      return setLoading(false);
    }

    try {
      const res = await http.post("/auth/table-login", {
        id: selected.id,
        passcode,
      });

      setLoading(false);
      setTable({ id: selected.id, name: selected.name, token: res.data.token });

      return router.push(`/tables/menus`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          notifications.show({
            title: "Invalid passcode",
            message: "Please try again",
            color: "red",
          });

          return setLoading(false);
        }
      }

      notifications.show({
        title: "Something went wrong",
        message: "Please try again",
        color: "red",
      });

      return setLoading(false);
    }
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
