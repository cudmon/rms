"use client";

import { useState } from "react";
import { Card, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Table } from "@/types/entity";
import { notifications } from "@mantine/notifications";

type Props = {
  table: Table;
};

export const Tables = ({ table }: Props) => {
  const unavailable = (status: string) => {
    if (table.status === "IDLE") {
      table.status = status;
      setBackGround("red");
      notifications.show({
        title: "Confirm table",
        message: `You have reserved ${table.name}`,
      });
    }
  };

  const reserve = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: <Text size="sm">Want to reserve {table.name}?</Text>,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () =>
        notifications.show({
          title: "Discard confirmation",
          message: `${table.name} is discarded`,
        }),
      onConfirm: () => unavailable("RESERVED"),
    });
  const [background, setBackGround] = useState(table.status === "IDLE" ? "green": "red");
  return (
    <>
      <Card
        w={table.seat === 2 ? 90 : 130}
        bg={background}
        onClick={() => {
          if (table.status === "IDLE") {
            reserve();
          }
        }}
        style={{ cursor: "pointer" }}
      >
        <Text c={"white"} ta="center">
          {table.name}
        </Text>
        <Text c={"white"} ta="center">
          {`(${table.seat})`}
        </Text>
      </Card>
    </>
  );
};
