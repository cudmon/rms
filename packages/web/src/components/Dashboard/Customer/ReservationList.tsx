"use client";

import { TableEntity } from "@/types/entity";
import { IconArmchair } from "@tabler/icons-react";
import {
  Badge,
  Card,
  Center,
  Container,
  Text,
  Grid,
  Button,
  rem,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { http } from "@/modules/http";
import { AxiosError } from "axios";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useUserStore } from "@/store/user";

const getStatusColor = (status: string) => {
  switch (status) {
    case "IDLE":
      return "green";
    case "EATING":
      return "red";
    case "RESERVED":
      return "orange.5";
  }
};

export const ReservationList = () => {
  const { user } = useUserStore();
  const [tableList, setTableList] = useState<TableEntity[]>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await http().get("/tables");
        setTableList(res.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            setTableList([]);
            return;
          }
        }
      }
    };
    fetch();
  }, []);

  const confirm = (table: { name: string; id: string }) => {
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: <Text size="sm">Want to reserve?</Text>,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => {},
      onConfirm: () => {
        reserve(table.id);
      },
    });
  };

  const reserve = async (tableID: string) => {
    let currentTime = new Date().toISOString();
    try {
      await http().post("/reservations", {
        when: currentTime,
        userId: user.id,
        tableId: tableID,
      });
      
      notifications.show({
        title: "Reservation success",
        message: `Table is reserved`,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message === "Table not available") {
          notifications.show({
            color: "red",
            title: "Reservation fail",
            message: error.response?.data.message,
          });
        }
        if (error.response?.data.message === "Reservation must be made at least 24 hour in advance") {
          notifications.show({
            color: "red",
            title: "Reservation fail",
            message: error.response?.data.message,
          });
        }
        if (error.response?.data.message === "Reservation must be made at most 30 days in advance") {
          notifications.show({
            color: "red",
            title: "Reservation fail",
            message: error.response?.data.message,
          });
        }
        if (error.response?.data.message === "You can only have 1 reservation at a time") {
          notifications.show({
            color: "red",
            title: "Reservation fail",
            message: error.response?.data.message,
          });
        }
      } else {
        notifications.show({
          color: "red",
          title: "Reservation fail",
          message: `Something went wrong please try again later`,
        });
      }
    }
  };

  return (
    <Container>
      <Title order={3} size="h1" fw={900} ta="center">
        Reservation
      </Title>
      <Text ta="center" mt="md" fw={750} mb={10}>
        Table List
      </Text>

      <Grid>
        {tableList.map((table) => (
          <Grid.Col span={4} key={table.id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Grid columns={2} justify="flex-start" align="center">
                <Grid.Col span={1}>
                  <Text size="xl">
                    <strong>Name :</strong> {table.name}{" "}
                  </Text>
                </Grid.Col>

                <Grid.Col span={1}>
                  <Center>
                    <Badge
                      color={getStatusColor(table.status)}
                      variant="filled"
                      size="lg"
                    >
                      {table.status}
                    </Badge>
                  </Center>
                </Grid.Col>

                <Grid.Col span={1}>
                  <Text size="xl">
                    <IconArmchair style={{ width: rem(16), height: rem(16) }} />{" "}
                    : {table.seat}{" "}
                  </Text>
                </Grid.Col>

                <Grid.Col span={1}>
                  <center>
                    <Button
                      disabled={table.status === "IDLE" ? false : true}
                      onClick={() =>
                        confirm({ name: table.name, id: table.id })
                      }
                      variant="filled"
                      color={table.status === "IDLE" ? "blue.5" : "red.5"}
                      radius="md"
                    >
                      Reserve
                    </Button>
                  </center>
                </Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};
