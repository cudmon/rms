"use client";

import { http } from "@/modules/http";
import { useEffect, useState } from "react";
import {
  Card,
  NumberInput,
  Table,
  TextInput,
  Title,
  Group,
} from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { log } from "console";
import { TimeInput } from "@mantine/dates";

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
        const res = await http.get("/settings");

        setSettings(res.data);
      } catch (error) {}
    })();
  }, []);

  const updateSetting = async (name: string, value: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.name === name ? { ...s, value } : s))
    );

    try {
      await http.patch(`/settings/${name}`, { value });
    } catch (error) {}
  };

  return (
    <>
      <Group justify="space-between" my="md">
        <Title order={3} size="h2" fw={900} ta="center">
          Settings
        </Title>
        <IconSettings stroke={1.5} size={32} />
      </Group>

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
                {setting.type === "STRING" && (
                  <Table.Td>
                    <TextInput
                      value={setting.value}
                      onChange={(v) => {
                        updateSetting(setting.name, v.currentTarget.value);
                      }}
                    />
                  </Table.Td>
                )}
                {setting.type === "NUMBER" && (
                  <Table.Td>
                    <TextInput
                      type="number"
                      value={setting.value}
                      placeholder="0 will be used if empty"
                      onChange={(v) => {
                        updateSetting(setting.name, v.currentTarget.value);
                      }}
                    />
                  </Table.Td>
                )}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </>
  );
}
