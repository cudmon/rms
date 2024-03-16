import { http } from "@/modules/http";
import { User } from "@/types/entity";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Button, Stack, TextInput } from "@mantine/core";

export const ChangeInfoModal = ({ user }: { user: User }) => {
  const form = useForm({
    initialValues: {
      email: user.email,
      name: user.name,
      telephone: user.telephone,
      username: user.username,
    },

    validate: {
      name: (value) =>
        value.length < 3 ? "Name must be longer than 3 characters" : null,
      username: (value) =>
        value.length < 4 ? "Username must be longer than 4 characters" : null,
      telephone: (value) =>
        value.length !== 10 ? "Invalid telephone number" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const updateInformation = async (
    values: {
      email: string;
      name: string;
      telephone: string;
      username: string;
    },
    id: string
  ) => {
    try {
      await http.patch(`/users/${id}`, values);
      notifications.show({
        title: "Success",
        message: "Complete change",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Failed",
        message: "Failed to change information",
        color: "red",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => {
          updateInformation(values, user.id);
        })}
      >
        <Stack w={400} px={20} py={10}>
          <TextInput
            disabled={user.role === "MANAGER" ? false : true}
            withAsterisk
            label="Usename"
            placeholder="Usename"
            name="username"
            {...form.getInputProps("username")}
          />
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Name"
            name="name"
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="Email"
            name="email"
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="Telephone"
            placeholder="Telephone"
            type="number"
            name="telephone"
            {...form.getInputProps("telephone")}
          />
          <Button type="submit">Confirm change</Button>
        </Stack>
      </form>
    </>
  );
};
