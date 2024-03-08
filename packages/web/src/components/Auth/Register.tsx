"use client";

import { http } from "@/modules/http";
import { Stack, Text, TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const Register = () => {
  const route = useRouter();
  const register = async (information: {
    email: string;
    name: string;
    telephone: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    const { confirmPassword, ...informations } = information;
    try {
      await http().post("/auth/register", informations);
      route.push('/login');
    } catch (error) {
      if(error instanceof AxiosError) {
        if(error.response?.status === 401) {
          notifications.show({
            title: "Error",
            message: "Information is aready used",
            color: "red",
          });
        }
      }
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      telephone: "",
      username: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      name: (value) => (value.length < 3 ? "Name must longer than 3" : null),
      username: (value) =>
        value.length < 4 ? "Username must longer than 4" : null,
      password: (value) =>
        value.length < 8 ? "Password must longer than 8" : null,
      telephone: (value) => (value.length != 10 ? "Invalid telephone" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      confirmPassword: (value, pass) =>
        value != pass.password ? "Password not match" : null,
    },
  });

  return (
    <>
      <form onSubmit={form.onSubmit((values) => register(values))}>
        <Stack w={400} px={20} py={10}>
          <Text fz={24}>Please enter your information.</Text>
          <TextInput
            withAsterisk
            label="Usename"
            placeholder="Usename"
            {...form.getInputProps("username")}
          />
          <TextInput
            withAsterisk
            label="Password"
            placeholder="Password"
            type="password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            withAsterisk
            label="Confirm password"
            placeholder="Confirm password"
            {...form.getInputProps("confirmPassword")}
          />
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="Telephone"
            placeholder="Telephone"
            type="number"
            {...form.getInputProps("telephone")}
          />
          <Button type="submit">Create account</Button>
        </Stack>
      </form>
    </>
  );
};
