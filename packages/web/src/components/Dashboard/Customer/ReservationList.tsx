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

export const ReservationList = ({ table }: { table: TableEntity[] }) => {
  return (
    <Container>
      <Title order={3} size="h1" fw={900} ta="center" c="black">
        Reservation
      </Title>
      <Text ta="center" mt="md" fw={750} mb={10}>
        Table List
      </Text>

      <Grid>
        {table.map((table) => (
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
                    <Button variant="filled" color="blue.5" radius="md">
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
