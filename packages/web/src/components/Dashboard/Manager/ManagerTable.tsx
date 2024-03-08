"use client";

import { useEffect, useState } from "react";
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
  rem,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconEdit,
  IconTrash,
  IconSquareRoundedPlus,
  IconSearch,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { TableEntity } from "@/types/entity";
import { http } from "@/modules/http";
import { table } from "console";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";

export const ManagerTable = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [ModalOpenAdd, setModalOpenAdd] = useState(false);
  const [ModalOpenEdit, setModalOpenEdit] = useState(false);

  const [tables, setTables] = useState<TableEntity[]>([]);

  const [search, setSearch] = useState("");

  const [formDataAdd, setFormDataAdd] = useState({
    name: "",
    seat: "",
    passcode: "",
    status: "IDLE",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    id: "",
    name: "",
    seat: 0,
    passcode: "",
    status: "IDLE",
  });

  {
    /* ---------------------------------------- Get Table ------------------------------------------------------- */
  }
  console.log("table : ", formDataAdd);

  const { isError, data } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      try {
        const res = await http().get("/tables");

        return res.data as TableEntity[];
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            return [];
          }
        }

        notifications.show({
          title: "Error",
          message: "Something went wrong. Please try again later",
          color: "red",
        });
      }
    },
  });

  useEffect(() => {
    if (data !== undefined) {
      setTables(data);
    }
  }, [data]);

  if (isError) {
    return (
      <Center py={64} fz={28} c="red" fw={500}>
        Error fetching users
      </Center>
    );
  }

  {
    /* ---------------------------------------- END Get Table ------------------------------------------------------- */
  }

  {
    /* ---------------------------------------- Add Table ------------------------------------------------------- */
  }

  const handleSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //seat is a number
      const resTableAdd = await http().post("/tables", {
        name: formDataAdd.name,
        seat: parseInt(formDataAdd.seat),
        passcode: formDataAdd.passcode,
        status: formDataAdd.status,
      });
      if (resTableAdd.status === 201) {
        notifications.show({
          title: "Success",
          message: "Table added successfully",
          color: "green",
        });
        setModalOpenAdd(false);
        setTables([...tables, resTableAdd.data]);
      }
    } catch (e) {
      notifications.show({
        title: "Error",
        message: "Something went wrong. Please try again later",
        color: "red",
      });
    }
  };

  {
    /* ---------------------------------------- END Add Table ------------------------------------------------------- */
  }

  {
    /* ---------------------------------------- Edit Table ------------------------------------------------------- */
  }
  const handleEdit = (id: string) => {
    const data = tables.find((table) => table.id === id);

    if (data !== undefined) {
      setFormDataEdit({
        id: data.id,
        name: data.name,
        seat: data.seat,
        passcode: data.passcode,
        status: data.status,
      });
      setModalOpenEdit(true);
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await http().patch(
        `/tables/${formDataEdit.id}`,
        formDataEdit
      );
      if (res.status === 200) {
        notifications.show({
          title: "Success",
          message: "Table updated successfully",
          color: "green",
        });

        const index = tables.findIndex((table) => table.id === formDataEdit.id);
        if (index !== -1) {
          tables[index] = formDataEdit;
          setTables([...tables]);
        }
      }

      setModalOpenEdit(false);
    } catch (e) {
      console.log(e);
    }
  };

  {
    /* ---------------------------------------- END Edit Table ------------------------------------------------------- */
  }

  {
    /* ---------------------------------------- Remove Table Modal ------------------------------------------------------- */
  }

  const remove = (id: string) => {
    modals.openConfirmModal({
      title: (
        <Text fz={18} fw={500}>
          Delete Table
        </Text>
      ),

      centered: true,

      labels: {
        confirm: "Confirm",
        cancel: "Cancel",
      },

      confirmProps: {
        color: "red",
      },

      children: <Text>Are you sure you want to Delete this Table?</Text>,

      onConfirm: async () => {
        try {
          const res_remove = await http().delete(`/tables/${id}`);

          if (res_remove.status === 200) {
            notifications.show({
              title: "Success",
              message: "Table deleted successfully",
              color: "green",
            });
            setTables(tables.filter((table) => table.id !== id));
          }
        } catch (e) {
          notifications.show({
            title: "Error",
            message: "Something went wrong. Please try again later",
            color: "red",
          });
        }
      },
    });
  };

  {
    /* ---------------------------------------- END Remove Table Modal ------------------------------------------------------- */
  }

  {
    /* ---------------------------------------- Search ------------------------------------------------------- */
  }
  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(event.target.value);
  // };

  // const tablelist = tables.filter(
  //   (table) =>
  //     table.status?.toLowerCase().includes(search.toLowerCase()) ||
  //     table.name.toLowerCase().includes(search.toLowerCase()) ||
  //     table.seat?.toString().includes(search.toLowerCase())
  // );
  {
    /* ---------------------------------------- END Search ------------------------------------------------------- */
  }

  const rows = tables.map((tablelist) => {
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
              onClick={() => handleEdit(tablelist.id)}
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
              onClick={() => remove(tablelist.id)}
              color="#f03e3e"
              radius="md"
            >
              <IconTrash style={{ width: "80%", height: "80%" }} />
            </ActionIcon>
          </Tooltip>
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

        <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          // value={search}
          // onChange={handleSearchChange}
        />

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
              onClick={() => setModalOpenAdd(true)}
            >
              <IconSquareRoundedPlus stroke={1.5} size={28} />
            </ActionIcon>
          </Grid>
        </Card>
      </Container>

      {/* ---------------------------------------- Edit Table Modal ------------------------------------------------------- */}
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
      {/* ---------------------------------------- END Edit Table Modal ------------------------------------------------------- */}

      {/* ---------------------------------------- Add Table Modal ------------------------------------------------------- */}
      <Modal
        opened={ModalOpenAdd}
        onClose={() => setModalOpenAdd(false)}
        title="Add Table"
        styles={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.1)", // Adjust the last value (0.5) to change opacity
          },
        }}
      >
        <form onSubmit={handleSubmitAdd}>
          <TextInput
            mt="md"
            ata-autofocus
            label="Table name"
            placeholder="Table name"
            value={formDataAdd.name}
            onChange={(e) =>
              setFormDataAdd({ ...formDataAdd, name: e.currentTarget.value })
            }
          />
          <TextInput
            mt="md"
            ata-autofocus
            label="Seat"
            placeholder="Seat"
            value={formDataAdd.seat}
            onChange={(e) =>
              setFormDataAdd({
                ...formDataAdd,
                seat: e.currentTarget.value,
              })
            }
          />
          <TextInput
            mt="md"
            ata-autofocus
            label="Passcode"
            placeholder="Passcode"
            value={formDataAdd.passcode}
            onChange={(e) =>
              setFormDataAdd({
                ...formDataAdd,
                passcode: e.currentTarget.value,
              })
            }
          />
          <Select
            mt="md"
            label="Status"
            placeholder="Pick table status"
            data={["idle", "eating", "reserve"]}
            defaultValue={formDataAdd.status}
            value={formDataAdd.status}
            onChange={(e) => {
              setFormDataAdd({ ...formDataAdd, status: e || "" });
            }}
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
              type="submit"
              mt="sm"
              color="green"
            >
              Save
            </Button>
            <Button
              variant="filled"
              radius="lg"
              mt="sm"
              color="red"
              onClick={() => setModalOpenAdd(false)}
            >
              Cancel
            </Button>
          </Flex>
        </form>
      </Modal>
      {/* ---------------------------------------- END Add Table Modal ------------------------------------------------------- */}
    </>
  );
};
