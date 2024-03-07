"use client";

import { useState } from "react";
import {
  Container,
  Group,
  ActionIcon,
  Table,
  Card,
  Modal,
  TextInput,
  Button,
  Box,
  Avatar,
  Select,
  Title,
  Tooltip,
  Text,
  SimpleGrid,
  Grid,
  rem,
  Flex,
} from "@mantine/core";
import {
  IconEdit,
  IconAt,
  IconPhone,
  IconBuildingStore,
  IconUserEdit,
  IconTrash,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import "@mantine/notifications/styles.css";
import { User } from "@/types/entity";
import { http } from "@/modules/http";
import { modals } from "@mantine/modals";
import { IconSearch } from "@tabler/icons-react";

export const ManagerUser = ({ Employee }: { Employee: User[] }) => {

  const [search, setSearch] = useState("");
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [ModalOpenAdd, setModalOpenAdd] = useState(false);

  const [formDataAdd, setFormDataAdd] = useState({
    username: "",
    password: "",
    name: "",
    role: "STAFF",
    email: "",
    telephone: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    id : "",
    username: "",
    name: "",
    role: "",
    email: "",
    telephone: "",
  });

  const handleEdit = (id: string) => {
    const data = Employee.find((user) => user.id === id);
    
    if (data !== undefined) {
      setFormDataEdit({
        id: data.id,
        username: data.username,
        name: data.name,
        role: data.role,
        email: data.email,
        telephone: data.telephone,
      });
      setIsModalOpenEdit(true);
    }
  };
  

  async function handleSubmitAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await http().post("/users", formDataAdd);
      setModalOpenAdd(false);
    } catch (e) {
      console.log(e);
    }
  };

const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // ป้องกันการรีโหลดหน้าเว็บ
  try {
    await http().patch(`/users/${formDataEdit.id}`, formDataEdit);
    setIsModalOpenEdit(false);
  } catch (e) {
    console.log(e);
  }
};

  const links = [
    { link: "/dashboard/menus", label: "Menu" },
    { link: "/dashboard/table", label: "Table" },
    { link: "/dashboard/user", label: "User" },
  ];

  const remove = (id: string) => {
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


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredRows = Employee.filter(employee =>
    employee.username.toLowerCase().includes(search.toLowerCase()) ||
    employee.name.toLowerCase().includes(search.toLowerCase()) ||
    employee.role.toLowerCase().includes(search.toLowerCase()) ||
    employee.email.toLowerCase().includes(search.toLowerCase()) ||
    employee.telephone.toLowerCase().includes(search.toLowerCase())
  );
  

  const rows = filteredRows.map(Employee =>  (
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
            onClick={() => handleEdit(Employee.id)}
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
            onClick={() => remove(Employee.id)}
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
        <Text ta="center" c="dimmed" my="md" fw={750}>
          User Table
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
          value={search}
          onChange={handleSearchChange}
        />
        <Card shadow="md" padding="lg" radius="md" withBorder mt="md">
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

      <Modal
        opened={isModalOpenEdit}
        onClose={() => setIsModalOpenEdit(false)}
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
        <form onSubmit={handleSubmitEdit}>
        <Box mx="xl" component="form">
    
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                mt="sm"
                label="Username"
                placeholder="Your Username"
                withAsterisk
                leftSection={<IconUserEdit size={16} />}
                {...form.getInputProps("id")}
                value={formDataEdit.username}
                onChange={(e) => setFormDataEdit({ ...formDataEdit, username: e.target.value })}
              />
              <TextInput
                mt="sm"
                label="Username"
                placeholder="Your Username"
                withAsterisk
                leftSection={<IconUserEdit size={16} />}
                {...form.getInputProps("username")}
                value={formDataEdit.username}
                onChange={(e) => setFormDataEdit({ ...formDataEdit, username: e.target.value })}
              />
              <TextInput
                mt="sm"
                label="Name"
                placeholder="Your Name"
                withAsterisk
                leftSection={<IconUserEdit size={16} />}
                {...form.getInputProps("name")}
                value={formDataEdit.name}
                onChange={(e) => setFormDataEdit({ ...formDataEdit, name: e.target.value })}
              />
            </SimpleGrid>
            <Select
              mt="sm"
              label="Roles"
              placeholder="Your roles"
              data={["MANAGER", "CHEF", "STAFF", "CUSTOMER"]}
              leftSection={<IconBuildingStore size={16} />}
              comboboxProps={{ shadow: "md" }}
              {...form.getInputProps("role")}
              defaultValue={formDataEdit.role}
              onChange={(e) => setFormDataEdit({ ...formDataEdit, role: e || "" })}
            />
            <TextInput
              mt="sm"
              label="Email"
              placeholder="Your Email"
              withAsterisk
              leftSection={<IconAt size={16} />}
              {...form.getInputProps("email")}
              value={formDataEdit.email}
              onChange={(e) => setFormDataEdit({ ...formDataEdit, email: e.target.value })}
            />
            <TextInput
              mt="sm"
              label="Telephone"
              placeholder="Your Phone number"
              withAsterisk
              leftSection={<IconPhone size={16} />}
              {...form.getInputProps("telephone")}
              value={formDataEdit.telephone}
              onChange={(e) => setFormDataEdit({ ...formDataEdit, telephone: e.target.value })}
            />
         
          <Group justify="center" mt="md">
          <Button type="submit" variant="filled" radius="lg" mt="sm" color="green">
    Save
  </Button>
            <Button
              variant="filled"
              color="red"
              radius="lg"
              onClick={() => setIsModalOpenEdit(false)}
            >
              Cancel
            </Button>
          </Group>
          
        </Box>
        </form>
      </Modal>

      <Modal
  opened={ModalOpenAdd}
  onClose={() => setModalOpenAdd(false)}
  title="Add Users"
  styles={{
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.1)", // Adjust the last value (0.5) to change opacity
    },
  }}
>
  <form onSubmit={handleSubmitAdd}>
    <TextInput 
      autoFocus
      label="Username" 
      placeholder="Username"
      value={formDataAdd.username}
      onChange={(e) => setFormDataAdd({ ...formDataAdd, username: e.target.value })}
    />
        <TextInput 
      autoFocus
      label="Password" 
      placeholder="Password"
      value={formDataAdd.password}
      onChange={(e) => setFormDataAdd({ ...formDataAdd, password: e.target.value })}
    />
    <TextInput 
      mt="md"
      label="Name" 
      placeholder="Name" 
      value={formDataAdd.name}
      onChange={(e) => setFormDataAdd({ ...formDataAdd, name: e.target.value })}
    />
<Select 
  mt="md"
  label="Role" 
  placeholder="Pick role"
  data={["MANAGER", "CHEF", "STAFF", "CUSTOMER"]} 
  value={formDataAdd.role}
  onChange={(e) => {
    setFormDataAdd({ ...formDataAdd, role: e ||"" });
  }}
/>
    <TextInput 
      mt="md"
      label="Email" 
      placeholder="Email"
      value={formDataAdd.email}
      onChange={(e) => setFormDataAdd({ ...formDataAdd, email: e.target.value })}
    />
    <TextInput 
      mt="md"
      label="Telephone" 
      placeholder="Telephone"
      value={formDataAdd.telephone}
      onChange={(e) => setFormDataAdd({ ...formDataAdd, telephone: e.target.value })}
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
      <Button type="submit" variant="filled" radius="lg" mt="sm" color="green"
  >
        Save
      </Button>
      <Button variant="filled" radius="lg" mt="sm" color="red" onClick={() => setModalOpenAdd(false)}>
        Cancel
      </Button>
    </Flex>
  </form>
</Modal>

    </>
  );
};
