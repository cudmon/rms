"use client";

import {
  Grid,
  GridCol,
  Text,
  Center,
  TextInput,
  Stack,
  Card,
  Flex,
  Menu,
  Modal,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import {
  IconAt,
  IconCrown,
  IconEdit,
  IconPassword,
  IconPhone,
  IconSettings,
  IconUser,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import { http } from "@/modules/http";
import { User } from "@/types/entity";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { ChangePasswordModal } from "./PasswordModal";
import { notifications } from "@mantine/notifications";
import { ChangeInfoModal } from "@/components/Auth/InfoModal";

export const metadata = {
  title: "Profile",
};

const style = {
  input: {
    cursor: "auto",
  },
};

export function Profile() {
  const [user, setUser] = useState<User>();
  const [openInformation, { open: openInfo, close: closeInfo }] =
    useDisclosure(false);
  const [openPassword, { open: openPass, close: closePass }] =
    useDisclosure(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await http.get<User>("/auth/profile");
        setUser(res.data);
      } catch (error) {
        notifications.show({
          title: "Error",
          message: "Failed to fetch user profile",
          color: "red",
        });
      }
    })();
  }, []);

  return (
    <>
      <Modal
        opened={openInformation}
        onClose={closeInfo}
        title="Edit information"
      >
        {user && <ChangeInfoModal user={user} setUser={setUser} />}
      </Modal>
      <Modal opened={openPassword} onClose={closePass} title="Edit password">
        {user && <ChangePasswordModal user={user} />}
      </Modal>
      <Center py={40}>
        <Card withBorder h={550}>
          <Stack w={250} px={20}></Stack>
          <Flex justify="center">
            <Stack w={400} px={20}>
              <Grid gutter={15}>
                <GridCol span={12}>
                  <Text fz={28} ta="center">
                    {"Profile  "}
                    <Menu>
                      <Menu.Target>
                        <Tooltip label="Edit">
                          <ActionIcon
                            radius="md"
                            variant="default"
                            aria-label="Settings"
                            size={32}
                            mr="md"
                          >
                            <IconEdit style={{ width: "80%", height: "80%" }} />
                          </ActionIcon>
                        </Tooltip>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label>Edit</Menu.Label>
                        <Menu.Item
                          leftSection={<IconSettings />}
                          onClick={openInfo}
                        >
                          Information
                        </Menu.Item>
                        <Menu.Item
                          leftSection={<IconPassword />}
                          onClick={openPass}
                        >
                          password
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
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
                    leftSection={<IconUser size={18} />}
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
