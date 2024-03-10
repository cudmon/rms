"use client";

import { http } from "@/modules/http";
import { useEffect, useState } from "react";
import { Card, Table, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { log } from "console";

function toNormalCase(str: string) {
  return (str.at(0)?.toUpperCase() + str.slice(1).toLowerCase()).replace(
    /_/g,
    " "
  );
}

export function ManagerSettings() {
  const [settings, setSettings] = useState<
    {
      id: number;
      name: string;
      value: string;
      type: string;
    }[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await http().get("/settings");

        setSettings(res.data);
      } catch (error) {}
    })();
  }, []);

  const updateSetting = async (name: string, value: string, type: string) => {
    let invalid = false;

    if (type === "NUMBER" && (value === "" || isNaN(Number(value)))) {
      invalid = true;
      notifications.show({
        title: "Invalid value",
        message: "Value must be a number",
        color: "red",
      });
    }

    if (type === "TIME" && !/^\d{2}:\d{2}$/.test(value)) {
      invalid = true;
      notifications.show({
        title: "Invalid value",
        message: "Value must be in HH:MM format",
        color: "red",
      });
    }

    setSettings((prev) =>
      prev.map((s) => (s.name === name ? { ...s, value } : s))
    );

    if (invalid) return;

    try {
      await http().patch(`/settings/${name}`, { value });
    } catch (error) {}
  };

  return (
    <>
      <Title order={1} my={32} ta="center">
        Settings
      </Title>
      <Card padding="lg" radius="md" withBorder mt="md">
        <Table fz={16} horizontalSpacing="md" verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Value</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {settings.map((setting) => (
              <Table.Tr key={setting.id}>
                <Table.Td>{toNormalCase(setting.name)}</Table.Td>
                <Table.Td>
                  <TextInput
                    value={setting.value}
                    onChange={({ currentTarget }) => {
                      updateSetting(
                        setting.name,
                        currentTarget.value,
                        setting.type
                      );
                    }}
                  />
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </>
  );
}
