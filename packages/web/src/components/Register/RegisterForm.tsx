"use client";

import { Stack, Text, TextInput, PasswordInput, Button } from "@mantine/core";
import { useState } from "react";

export const RegisterForm = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [telephone, setTelephone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <Stack w={400} px={20} py={10}>
        <Text fz={24}>
          Please enter your information.
        </Text>
        <TextInput
          label="Name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <TextInput
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextInput
          label="Telephone"
          placeholder="Telephone"
          type="number"
          value={telephone}
          onChange={(e) => setTelephone(e.currentTarget.value)}
        />
        <TextInput
          label="Username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <PasswordInput
          label="Confirm password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        />
        <Button>Create account</Button>
      </Stack>
    </>
  );
};
