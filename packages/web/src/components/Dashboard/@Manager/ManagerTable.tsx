"use client";

import { useState } from "react";
import {
  Container,
  Table,
  ActionIcon,
  Modal,
  TextInput,
  Text,
  Tooltip,
  Badge,
  Select,
  Button,
  Flex,
  Card,
  Grid,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconEdit,
  IconTrash,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";

import Link from "next/link";
import { modals } from "@mantine/modals";
import { TableEntity } from "@/types/entity";

export const ManagerTable = ({ tablelist }: { tablelist: TableEntity[] }) => {
  const links = [
    { link: "/dashboard/menus", label: "Menu" },
    { link: "/dashboard/table", label: "Table" },
    { link: "/dashboard/user", label: "User" },
  ];

  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const [ModalOpenadd, setModalOpenadd] = useState(false);

  

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete your Table",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete your Table ?</Text>
      ),

      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { color: "red", radius: "md" },
      cancelProps: { color: "white", radius: "md" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  const rows = tablelist.map((tablelist) => {
    let badgeColor = "gray";

    switch (tablelist.status) {
      case "IDLE":
        badgeColor = "green";
        break;
      case "RESERVED":
        badgeColor = "orange.5";
        break;
      case "EATING":
        badgeColor = "red";
        break;
      default:
        break;
    }

    return (
      <Table.Tr key={tablelist.name} ta="center">
        <Table.Td>{tablelist.name}</Table.Td>

        <Table.Td>
          <Badge color={badgeColor} ta="center">
            {tablelist.status}
          </Badge>
        </Table.Td>

        <Table.Td>{tablelist.seat}</Table.Td>
        <Table.Td>
          <Tooltip label="Edit">
            <ActionIcon
              mr="md"
              variant="default"
              aria-label="Edit"
              size={32}
              onClick={open}
              radius="md"
            >
              <IconEdit style={{ width: "80%", height: "80%" }} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete">
            <ActionIcon
              variant="filled"
              aria-label="Delete"
              size={32}
              onClick={openDeleteModal}
              color="#f03e3e"
              radius="md"
            >
              <IconTrash style={{ width: "80%", height: "80%" }} />
            </ActionIcon>
          </Tooltip>

          <Modal
            opened={opened}
            onClose={close}
            title="Edit Table"
            styles={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <TextInput
              ata-autofocus
              label="Tablenumber"
              placeholder="Table numbers"
              value="wait for api"
            />
            <Select
              mt="md"
              label="Status"
              placeholder="Pick table status"
              data={["idle", "eating", "reserve"]}
              defaultValue="wait for api"
            />
            <Select
              mt="md"
              label="seat"
              placeholder="Pick seat"
              data={["2", "4", "6"]}
              defaultValue="wait for api"
            />

            <Flex
              mih={50}
              mt="md"
              gap="xl"
              justify="center"
              align="flex-start"
              direction="row"
              wrap="wrap"
            >
              <Button
                variant="filled"
                radius="lg"
                mt="sm"
                color="green"
                onClick={close}
              >
                Save
              </Button>
              <Button
                variant="filled"
                radius="lg"
                mt="sm"
                color="red"
                onClick={close}
              >
                Cancel
              </Button>
            </Flex>
          </Modal>

          <Modal
            opened={ModalOpenadd}
            onClose={() => setModalOpenadd(false)}
            title="Add Table"
            styles={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.1)", // Adjust the last value (0.5) to change opacity
              },
            }}
          >
            <TextInput
              ata-autofocus
              label="Tablenumber"
              placeholder="Table numbers"
            />
            <Select
              mt="md"
              label="Status"
              placeholder="Pick table status"
              data={["idle", "eating", "reserve"]}
            />
            <Select
              mt="md"
              label="seat"
              placeholder="Pick seat"
              data={["2", "4", "6"]}
            />

            <Flex
              mih={50}
              mt="md"
              gap="xl"
              justify="center"
              align="flex-start"
              direction="row"
              wrap="wrap"
            >
              <Button
                variant="filled"
                radius="lg"
                mt="sm"
                color="green"
                onClick={close}
              >
                Save
              </Button>
              <Button
                variant="filled"
                radius="lg"
                mt="sm"
                color="red"
                onClick={() => setModalOpenadd(false)}
              >
                Cancel
              </Button>
            </Flex>
          </Modal>
        </Table.Td>
      </Table.Tr>
    );
  });

  const head = (
    <Table.Tr>
      <Table.Th ta="center">Table number</Table.Th>
      <Table.Th ta="center">Status</Table.Th>
      <Table.Th ta="center">Seat</Table.Th>
      <Table.Th ta="center"></Table.Th>
    </Table.Tr>
  );

  return (
    <>
      <Container my="md">
        <Title order={3} size="h1" fw={900} ta="center" c="black">
          TABLE
        </Title>
        <Text ta="center" c="dimmed" mt="md" fw={750}>
          Table List
        </Text>
      </Container>
      <Container>
        <Card shadow="md" padding="lg" radius="md" withBorder>
          <Table stickyHeader verticalSpacing="sm" highlightOnHover>
            <Table.Thead>{head}</Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
          <Grid justify="flex-end">
            <ActionIcon
              variant="subtle"
              color="blue"
              size="lg"
              radius="xl"
              aria-label="add"
              onClick={() => setModalOpenadd(true)}
            >
              <IconSquareRoundedPlus stroke={1.5} size={28} />
            </ActionIcon>
          </Grid>
        </Card>
      </Container>
    </>
  );
};
