"use client";

import {
  IconAddressBook,
  IconAt,
  IconCrown,
  IconPhone,
  IconUser,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import {
  Grid,
  GridCol,
  Text,
  Center,
  TextInput,
  Stack,
  Card,
  Flex,
} from "@mantine/core";
import { http } from "@/modules/http";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";

export const metadata = {
  title: "Profile",
};

const style = {
  input: {
    cursor: "auto",
  },
};

interface User {
  id: string;
  name: string;
  username: string;
  role: string;
  email: string;
  telephone: string;
}

export default function Profile() {
  const [user, setUser] = useState<User>();
  try {
    const fetch = async () => {
      const res = await http().get("/auth/profile");
      setUser(res.data);
    };
    fetch();
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        notifications.show({
          title: "Error",
          message: "Not found user",
          color: "red",
        });
      }
    }
  }
  return (
    <>
      <Center py={40}>
        <Card withBorder h={550}>
          <Stack w={250} px={20}></Stack>
          <Flex justify="center">
            <Stack w={400} px={20}>
              <Grid gutter={15}>
                <GridCol span={12}>
                  <Text fz={28} ta="center">
                    Profile
                  </Text>
                </GridCol>
                <GridCol span={12}>
                  <Flex justify="center">
                    <IconUserSquareRounded size={120} />
                  </Flex>
                </GridCol>
                <GridCol span={6}>
                  <TextInput
                    disabled
                    label="Username"
                    value={user?.username}
                    styles={style}
                    leftSection={<IconAddressBook size={18} />}
                  />
                </GridCol>
                <GridCol span={6}>
                  <TextInput
                    disabled
                    label="Name"
                    value={user?.name}
                    styles={style}
                    leftSection={<IconUser size={18} />}
                  />
                </GridCol>
                <GridCol span={12}>
                  <TextInput
                    disabled
                    label="Email"
                    value={user?.email}
                    styles={style}
                    leftSection={<IconAt size={18} />}
                  />
                </GridCol>
                <GridCol span={12}>
                  <TextInput
                    disabled
                    label="Role"
                    value={user?.role}
                    styles={style}
                    leftSection={<IconCrown size={18} />}
                  />
                </GridCol>
                <GridCol span={12}>
                  <TextInput
                    disabled
                    label="Telephone"
                    value={user?.telephone}
                    styles={style}
                    leftSection={<IconPhone size={18} />}
                  />
                </GridCol>
              </Grid>
            </Stack>
          </Flex>
        </Card>
      </Center>
    </>
  );
}
