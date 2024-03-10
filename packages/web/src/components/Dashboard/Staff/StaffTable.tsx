"use client";

import { TableEntity, Order } from "@/types/entity";
import { IconArmchair, IconTags, IconUserEdit } from "@tabler/icons-react";
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
  Modal,
  TextInput,
  Box,
  SimpleGrid,
  Table,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { IconX, IconCheck } from "@tabler/icons-react";

const Ordersz = [
  {
    id: 1,
    name: "ข้าวมันไก่",
    quantity: 2,
    price: 10000,
    status: "PENDING",
  },
  {
    id: 2,
    name: "ข้าวเป็ดย่าง",
    quantity: 3,
    price: 15000,
    status: "FINISHED",
  },
  {
    id: 3,
    quantity: 1,
    price: 5000,
    status: "SERVED",
  },
  {
    id: 4,
    name: "ข้าวเป็ดย่าง",
    quantity: 1,
    price: 5000,
    status: "CANCELED",
  },
];
 

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

export const TableStaff = ({
  table,
  order,
}: {
  table: TableEntity[];
  order: Order[];
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [ModalOpenOrder, setModalOpenOrder] = useState(false);
  
  const FinishOrder = (status: string) => {
    if (status === "FINISHED") {
      return true;
    }
    return false;
  };

  const head = (
    <Table.Tr>
      <Table.Th ta="center">ID Order</Table.Th>
      <Table.Th ta="center">Menu Name</Table.Th>
      <Table.Th ta="center">Quantity</Table.Th>
      <Table.Th ta="center">Price</Table.Th>
      <Table.Th ta="center">Status</Table.Th>
      <Table.Th ta="center"></Table.Th>
    </Table.Tr>
  );

  const rowsOrder = Ordersz.map((item) => {
    let badgeColor = "gray";

    switch (item.status) {
      case "PENDING":
        badgeColor = "green";
        break;
      case "FINISHED":
        badgeColor = "red";
        break;
      case "SERVED":
        badgeColor = "orange";
        break;
      case "CANCELED":
        badgeColor = "gray";
        break;

      default:
        break;
    }

    return (
      <Table.Tr key={item.id} ta="center">
        <Table.Td>{item.id}</Table.Td>
        <Table.Td>{item.quantity}</Table.Td>
        <Table.Td>{item.price}</Table.Td>
        <Table.Td>
          <Badge color={badgeColor} ta="center">
            {item.status}
          </Badge>
        </Table.Td>
        <Table.Td>
          {FinishOrder(item.status) === true && (
            <ActionIcon   >
              <IconCheck radius="md" />{" "}
            </ActionIcon>

          )}
        </Table.Td>
        <Table.Td>{item.id}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    // --------------------------------------------------Table list--------------------------------------------------------
    <Container >
      <Title my="md" order={3} size="h1" fw={900} ta="center" c="black">
        Table List
      </Title>
      <Grid>
        {table.map((table) => (
          <Grid.Col span={4} key={table.id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Grid columns={6} justify="center" align="center">
                <Grid.Col span={2}>
                  <Text
                    size="xl"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <IconTags style={{ width: rem(20), height: rem(20) }} /> :{" "}
                    {table.name}{" "}
                  </Text>
                </Grid.Col>

                <Grid.Col span={2}>
                  <Center>
                    <Text
                      size="xl"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <IconArmchair
                        style={{ width: rem(20), height: rem(20) }}
                      />{" "}
                      : {table.seat}{" "}
                    </Text>
                  </Center>
                </Grid.Col>
                <Grid.Col span={3}>
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

                <Grid.Col span={5}>
                  <Grid columns={4}>
                    <Grid.Col span={2}>
                      <Center>
                        <Button
                          variant="filled"
                          color="blue.5"
                          radius="md"
                          onClick={() => setModalOpenOrder(true)}
                        >
                          Order
                        </Button>
                      </Center>
                    </Grid.Col>
                    <Grid.Col span={2}>
                      <Center>
                        <Button variant="filled" color="blue.5" radius="md">
                          Bill
                        </Button>
                      </Center>
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
          // ----------------------------------------------End Table list --------------------------------------------------------
        ))}
      </Grid>
      {/* -------------------------------------------------- modal order-------------------------------------------------------- */}
      <Modal
        opened={ModalOpenOrder}
        onClose={() => setModalOpenOrder(false)}
        title="Order"
        centered
        size="55%"
      >
        <Card shadow="md" padding="lg" radius="md" withBorder>
          <Table stickyHeader verticalSpacing="sm" highlightOnHover>
            <Table.Thead>{head}</Table.Thead>
            <Table.Tbody>{rowsOrder}</Table.Tbody>
          </Table>
        </Card>
      </Modal>
       {/* ------------------------------------------------End modal order-------------------------------------------------------- */}
    </Container>
  );
};
