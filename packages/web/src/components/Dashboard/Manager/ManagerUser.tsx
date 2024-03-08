"use client";

import { AxiosError } from "axios";
import { User } from "@/types/entity";
import { http } from "@/modules/http";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IconSearch } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import {
  IconEdit,
  IconAt,
  IconPhone,
  IconBuildingStore,
  IconUserEdit,
  IconTrash,
  IconSquareRoundedPlus,
  IconUserPlus,
  IconLockSquareRounded,
} from "@tabler/icons-react";
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
  rem,
  Flex,
  Center,
  PasswordInput,
} from "@mantine/core";

export const ManagerUser = () => {
  const [search, setSearch] = useState("");
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [ModalOpenAdd, setModalOpenAdd] = useState(false);
  const [users, setusers] = useState<User[]>([]);

  const [formDataAdd, setFormDataAdd] = useState({
    username: "",
    password: "",
    name: "",
    role: "STAFF",
    email: "",
    telephone: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    id: "",
    username: "",
    name: "",
    role: "",
    email: "",
    telephone: "",
  });

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

  const { isError, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await http().get("/users");

        return res.data as User[];
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
      setusers(data);
    }
  }, [data]);

  if (isError) {
    return (
      <Center py={64} fz={28} c="red" fw={500}>
        Error fetching users
      </Center>
    );
  }

  const handleEdit = (id: string) => {
    const data = users.find((user) => user.id === id);

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
      const res_add = await http().post("/users", {
        username: formDataAdd.username,
        password: formDataAdd.password,
        name: formDataAdd.name,
        role: formDataAdd.role.toLocaleUpperCase(),
        email: formDataAdd.email,
        telephone: formDataAdd.telephone,
      });
      if (res_add.status === 201) {
        notifications.show({
          title: "Success",
          message: "User added successfully",
          color: "green",
        });
        setModalOpenAdd(false);
        setusers([...users, res_add.data]);
      }
    } catch (e) {
      notifications.show({
        title: "Error",
        message: "Something went wrong. Please try again later",
        color: "red",
      });
    }
  }

  const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await http().patch(`/users/${formDataEdit.id}`, {
        username: formDataEdit.username,
        name: formDataEdit.name,
        role: formDataEdit.role.toLocaleUpperCase(),
        email: formDataEdit.email,
        telephone: formDataEdit.telephone,
      });
      if (res.status === 200) {
        notifications.show({
          title: "Success",
          message: "User updated successfully",
          color: "green",
        });

        const index = users.findIndex((user) => user.id === formDataEdit.id);
        if (index !== -1) {
          users[index] = {
            ...users[index],
            username: formDataEdit.username,
            name: formDataEdit.name,
            role: formDataEdit.role.toLocaleUpperCase(),
            email: formDataEdit.email,
            telephone: formDataEdit.telephone,
          };
          setusers([...users]);
        }
      }

      setIsModalOpenEdit(false);
    } catch (e) {
      console.log(e);
    }
  };

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
        try {
          const res_remove = await http().delete(`/users/${id}`);

          if (res_remove.status === 200) {
            notifications.show({
              title: "Success",
              message: "User deleted successfully",
              color: "green",
            });
            setusers(users.filter((user) => user.id !== id));
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredRows = users.filter(
    (users) =>
      users.username.toLowerCase().includes(search.toLowerCase()) ||
      users.name.toLowerCase().includes(search.toLowerCase()) ||
      users.role.toLowerCase().includes(search.toLowerCase()) ||
      users.email.toLowerCase().includes(search.toLowerCase()) ||
      users.telephone.toLowerCase().includes(search.toLowerCase())
  );

  const rows = filteredRows.map((users) => (
    <Table.Tr key={users.username} ta="center">
      <Table.Td>{users.username}</Table.Td>
      <Table.Td>{users.name}</Table.Td>
      <Table.Td>{users.role}</Table.Td>
      <Table.Td>{users.email}</Table.Td>
      <Table.Td>{users.telephone}</Table.Td>
      <Table.Td>
        <Tooltip label="Edit">
          <ActionIcon
            radius="md"
            variant="default"
            aria-label="Settings"
            size={32}
            onClick={() => handleEdit(users.id)}
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
            onClick={() => remove(users.id)}
            disabled={users.role == "MANAGER"}
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

  return (
    <>
      {/*----------------------------------------------------Container Rows--------------------------------------------------------------*/}
      <Container my="md">
        <Group justify="space-between">
          <Title order={3} size="h2" fw={900} ta="center" c="black">
            Users
          </Title>
          <ActionIcon
            variant="subtle"
            color="lime.6"
            size="lg"
            radius="xl"
            aria-label="add"
            onClick={() => setModalOpenAdd(true)}
          >
            <IconSquareRoundedPlus stroke={1.5} size={32} />
          </ActionIcon>
        </Group>
        <TextInput
          placeholder="Search for user information..."
          my="md"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          value={search}
          onChange={handleSearchChange}
        />
        <Card padding="lg" radius="md" withBorder mt="md">
          <Table stickyHeader verticalSpacing="sm" highlightOnHover>
            <Table.Thead>{head}</Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Card>
      </Container>
      {/*----------------------------------------------------Container Rows--------------------------------------------------------------*/}

      {/*-------------------------------------------------------Modal Edit--------------------------------------------------------------*/}
      <Modal
        opened={isModalOpenEdit}
        onClose={() => setIsModalOpenEdit(false)}
        title="Edit Profile"
        size="50%"
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
          <Box mx="xl" c="black">
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                mt="sm"
                label="Username"
                placeholder="Your Username"
                withAsterisk
                leftSection={<IconUserEdit size={16} />}
                {...form.getInputProps("username")}
                value={formDataEdit.username}
                onChange={(e) =>
                  setFormDataEdit({ ...formDataEdit, username: e.target.value })
                }
              />
              <TextInput
                mt="sm"
                label="Name"
                placeholder="Your Name"
                withAsterisk
                leftSection={<IconUserEdit size={16} />}
                {...form.getInputProps("name")}
                value={formDataEdit.name}
                onChange={(e) =>
                  setFormDataEdit({ ...formDataEdit, name: e.target.value })
                }
              />
            </SimpleGrid>
            <Select
              mt="sm"
              label="Roles"
              placeholder="Your roles"
              data={["Manager", "Chef", "Staff", "Customer"]}
              leftSection={<IconBuildingStore size={16} />}
              comboboxProps={{ shadow: "md" }}
              {...form.getInputProps("role")}
              defaultValue={
                formDataEdit.role.charAt(0).toUpperCase() +
                formDataEdit.role.slice(1).toLowerCase()
              }
              onChange={(e) =>
                setFormDataEdit({ ...formDataEdit, role: e || "" })
              }
            />
            <TextInput
              mt="sm"
              label="Email"
              placeholder="Your Email"
              withAsterisk
              leftSection={<IconAt size={16} />}
              {...form.getInputProps("email")}
              value={formDataEdit.email}
              onChange={(e) =>
                setFormDataEdit({ ...formDataEdit, email: e.target.value })
              }
            />
            <TextInput
              mt="sm"
              label="Telephone"
              placeholder="Your Phone number"
              withAsterisk
              leftSection={<IconPhone size={16} />}
              {...form.getInputProps("telephone")}
              value={formDataEdit.telephone}
              onChange={(e) =>
                setFormDataEdit({ ...formDataEdit, telephone: e.target.value })
              }
            />

            <Group justify="center" mt="md">
              <Button type="submit" variant="filled" radius="lg" color="green">
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
      {/*----------------------------------------------------END Modal Edit---------------------------------------------------------*/}

      {/*------------------------------------------------------Modal Add--------------------------------------------------------------*/}
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
        <form onSubmit={handleSubmitAdd}>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput
              autoFocus
              label="Username"
              placeholder="Username"
              withAsterisk
              mt="sm"
              leftSection={<IconUserPlus size={16} />}
              value={formDataAdd.username}
              onChange={(e) =>
                setFormDataAdd({ ...formDataAdd, username: e.target.value })
              }
            />
            <TextInput
              label="Name"
              placeholder="Name"
              withAsterisk
              mt="sm"
              leftSection={<IconUserPlus size={16} />}
              value={formDataAdd.name}
              onChange={(e) =>
                setFormDataAdd({ ...formDataAdd, name: e.target.value })
              }
            />
          </SimpleGrid>
          <PasswordInput
            autoFocus
            label="Password"
            placeholder="Password"
            withAsterisk
            mt="sm"
            leftSection={<IconLockSquareRounded size={16} />}
            value={formDataAdd.password}
            onChange={(e) =>
              setFormDataAdd({ ...formDataAdd, password: e.target.value })
            }
          />
          <Select
            label="Role"
            placeholder="Pick role"
            mt="sm"
            leftSection={<IconBuildingStore size={16} />}
            data={["Manager", "Chef", "Staff", "Customer"]}
            value={formDataAdd.role}
            onChange={(e) => {
              setFormDataAdd({ ...formDataAdd, role: e || "" });
            }}
          />
          <TextInput
            label="Email"
            placeholder="Email"
            withAsterisk
            mt="sm"
            leftSection={<IconAt size={16} />}
            value={formDataAdd.email}
            onChange={(e) =>
              setFormDataAdd({ ...formDataAdd, email: e.target.value })
            }
          />
          <TextInput
            label="Telephone"
            placeholder="Telephone"
            withAsterisk
            mt="sm"
            leftSection={<IconPhone size={16} />}
            value={formDataAdd.telephone}
            onChange={(e) =>
              setFormDataAdd({ ...formDataAdd, telephone: e.target.value })
            }
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
              type="submit"
              variant="filled"
              radius="lg"
              mt="sm"
              color="green"
            >
              Add
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
      {/*---------------------------------------------------- END Modal Add--------------------------------------------------------------*/}
    </>
  );
};
