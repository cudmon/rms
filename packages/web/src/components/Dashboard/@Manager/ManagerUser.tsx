"use client";

import { useState } from "react";
import {
  Container,
  Group,
  Burger,
  Anchor,
  ActionIcon,
  Table,
  Card,
  Modal,
  TextInput,
  Button,
  Box,
  Avatar,
  Select,
  Grid,
  Title,
  Tooltip,
  Text,
  SimpleGrid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconUserSquareRounded,
  IconEdit,
  IconUserFilled,
  IconAt,
  IconPhone,
  IconBuildingStore,
  IconUserEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import "@mantine/notifications/styles.css";

import Link from "next/link";
import { User } from "@/types/entity";
import { http } from "@/modules/http";
import { modals } from "@mantine/modals";

export const ManagerUser = ({ Employee }: { Employee: User[] }) => {
  const links = [
    { link: "/dashboard/menus", label: "Menu" },
    { link: "/dashboard/table", label: "Table" },
    { link: "/dashboard/user", label: "User" },
  ];

  const Delete = (id: string) => {
    modals.openConfirmModal({
      title: (
        <Text fz={18} fw={500}>
          Delete User
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

      children: <Text>Are you sure you want to Delete this user?</Text>,

      onConfirm: async () => {
        await http().delete(`/users/${id}`);
      },
    });
  };

  const [active, setActive] = useState(links[0].link);
  const [isModalOpen, setIsModalOpen] = useState(false);


  

  const rows = Employee.map((Employee) => (
    <Table.Tr key={Employee.username} ta="center">
      <Table.Td>{Employee.username}</Table.Td>
      <Table.Td>{Employee.name}</Table.Td>
      <Table.Td>{Employee.role}</Table.Td>
      <Table.Td>{Employee.email}</Table.Td>
      <Table.Td>{Employee.telephone}</Table.Td>
      <Table.Td>
        <Tooltip label="Edit">
          <ActionIcon
           radius="md"
            variant="default"
            aria-label="Settings"
            size={32}
            onClick={() => setIsModalOpen(true)}
            mr="md"
          >
            <IconEdit style={{ width: "80%", height: "80%" }} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon
            radius="md"
            variant="filled"
            aria-label="Delete"
            size={32}
            color="#f03e3e"
            onClick={() => Delete(Employee.id)}
            disabled={Employee.role == "MANAGER"}
          >
            <IconTrash style={{ width: "80%", height: "80%" }} />
          </ActionIcon>
        </Tooltip>
      </Table.Td>
    </Table.Tr>
  ));

  const head = (
    <Table.Tr>
      <Table.Th ta="center">Username</Table.Th>
      <Table.Th ta="center">Name</Table.Th>
      <Table.Th ta="center">Roles</Table.Th>
      <Table.Th ta="center">Email</Table.Th>
      <Table.Th ta="center">Telephone</Table.Th>
      <Table.Th ta="center"></Table.Th>
    </Table.Tr>
  );

  const form = useForm({
    initialValues: {
      username: "",
      name: "",
      roles: "",
      email: "",
      telephone: "",
    },

    validate: {
      username: (value) => (value.length < 2 ? "Username is too short" : null),
      name: (value) =>
        value.length < 4 ? "Name must have at least 4 letters" : null,
      roles: (value) => (value.length < 2 ? "Select your Roles" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      telephone: (value) =>
        value.length < 10 ? "Phonenumber must have at least 10 numbers" : null,
    },
  });

  return (
    <>
      <Container>
        <Title order={3} size="h1" fw={900} ta="center" c="black">
          USER INFO
        </Title>
        <Text ta="center" c="dimmed" mt="md" fw={750}>
          User Table
        </Text>
        <Card shadow="md" padding="lg" radius="md" withBorder mt="md">
          <Table stickyHeader verticalSpacing="sm" highlightOnHover>
            <Table.Thead>{head}</Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Card>
      </Container>

      <Modal 
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Profile"
        size="50%"
        c="dimmed"
      >
        <Title order={2} size="h2" fw={900} ta="center" c="black">
          Profile
        </Title>

        <Group justify="center">
          <Avatar
            variant="light"
            radius="xl"
            size="xl"
            src=""
            alt="no image here"
            mt="sm"
          />
        </Group>

        <Box mx="xl" component="form">
          <form>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                mt="sm"
                label="Username"
                placeholder="Your Username"
                withAsterisk
                leftSection={<IconUserEdit size={16} />}
                {...form.getInputProps("id")}
                value="wait for api"
              />
              <TextInput
                mt="sm"
                label="Username"
                placeholder="Your Username"
                withAsterisk
                leftSection={<IconUserEdit size={16} />}
                {...form.getInputProps("username")}
                value="wait for api"
              />
              <TextInput
                mt="sm"
                label="Name"
                placeholder="Your Name"
                withAsterisk
                leftSection={<IconUserEdit size={16} />}
                {...form.getInputProps("name")}
                value="wait for api"
              />
            </SimpleGrid>
            <Select
              mt="sm"
              label="Roles"
              placeholder="Your roles"
              data={["MANAGER", "CHEF", "STAFF", "CUSTOMER"]}
   
              leftSection={<IconBuildingStore size={16} />}
              comboboxProps={{ shadow: "md" }}

              defaultValue="wait for api"
              // disabled={editData.role == "MANAGER"}
              clearable
              
            />
            <TextInput
              mt="sm"
              label="Email"
              placeholder="Your Email"
              withAsterisk
              leftSection={<IconAt size={16} />}
              {...form.getInputProps("email")}
              value="wait for api" 
            />
            <TextInput
              mt="sm"
              label="Telephone"
              placeholder="Your Phone number"
              withAsterisk
              leftSection={<IconPhone size={16} />}
              {...form.getInputProps("telephone")}
              value="wait for api"
            />
          </form>
          <Group justify="center" mt="md">
            <Button type="submit" variant="filled" color="green" radius="lg">
              Save
            </Button>
            <Button variant="filled" color="red" radius="lg" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </Group>
        </Box>
      </Modal>
    </>
  );
};
