"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  TextInput,
  PasswordInput,
  Card,
  Stack,
  Text,
  Anchor,
  Flex,
} from "@mantine/core";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <>
      <Card shadow="sm" radius="md" w={700} withBorder>
        <Stack>
          <Text fz={60} fw={700} ta="center">
            LOGIN
          </Text>
          <TextInput
            size="lg"
            label="Username"
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.currentTarget.value);
            }}
          />
          <PasswordInput
            size="lg"
            label="Password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
          <Anchor target="_blank" underline="always">
            <Flex justify="flex-end" onClick={() => router.push("/register")}>
              Don&apos;t have an account?
            </Flex>
          </Anchor>
          <Button variant="filled" size="md" fullWidth>
            Login
          </Button>
        </Stack>
      </Card>
    </>
  );
};
