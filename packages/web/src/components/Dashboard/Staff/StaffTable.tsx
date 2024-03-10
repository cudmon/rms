"use client";

import { TableEntity, Order } from "@/types/entity";
import { IconArmchair, IconTags, IconUserEdit, IconCheck, IconCreditCard, IconBuildingBank } from "@tabler/icons-react";
import {
  Badge, Card, Center, Container, Text, Grid, Button, rem, Title, Modal, TextInput, Box, SimpleGrid, Table, Tooltip,
  ActionIcon, Paper, Radio, CheckIcon, UnstyledButton, Checkbox, Divider
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

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

const bills = [
  { id: 1, menu: 'Burger', quantity: 5, price: 20 },
  { id: 2, menu: 'Pizza', quantity: 3, price: 25 },

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
  const [value, setValue] = useState('react');
  const [ModalBilled, setModalBilled] = useState(false);
  const [values, onChange] = useState(true);

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

  const headbilled = (
    <Table.Tr>
      <Table.Th ta="center">ID</Table.Th>
      <Table.Th ta="center">Menu</Table.Th>
      <Table.Th ta="center">Price</Table.Th>
      <Table.Th ta="center">quantity</Table.Th>
    </Table.Tr>
  );

  const rowsbilled = bills.map((bill) => (
    <Table.Tr key={bill.id} ta="center">
      <Table.Td>{bill.id}</Table.Td>
      <Table.Td>{bill.menu}</Table.Td>
      <Table.Td>{bill.price}</Table.Td>
      <Table.Td>{bill.quantity}</Table.Td>
    </Table.Tr>
  ));


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
                        <Button variant="filled" color="blue.5" radius="md" onClick={() => setModalBilled(true)}>
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

      {/* -------------------------------------------------- Modal Billed-------------------------------------------------------- */}
      <Modal opened={ModalBilled} onClose={() => setModalBilled(false)} title="" size="80%" centered >
        <Title order={2} size="h2" fw={900} ta="center" c="black">
          Billed
        </Title>
        <Grid mt='md' align="stretch">
          <Grid.Col span='auto'>
            <Table stickyHeader verticalSpacing="sm" highlightOnHover withTableBorder>
              <Table.Thead>{headbilled}</Table.Thead>
              <Table.Tbody>{rowsbilled}</Table.Tbody>
            </Table>
          </Grid.Col>
          <Grid.Col span={4} >
            <Paper p="xl" withBorder radius='md' >
              <Text fw={900} size="lg">Total Prices</Text>
              <Text>175.00</Text>

            </Paper>
            <Paper p="xl" mt='sm' withBorder radius='md'>
              <Text fw={900} size="lg">Payments</Text>

              <Radio.Group value={value}
                onChange={setValue}
                name="payment"
                description="Select Payment Method">

                <Radio icon={CheckIcon} value="cash" color="blue.5" label="Cash" mt='md' />
                <Radio icon={CheckIcon} value="svelte" color="blue.5" label="Credit / Debit Card" mt='md' />
                <Radio icon={CheckIcon} value="ng" color="blue.5" label="Bank" mt='md' />
              </Radio.Group>

              <Button variant="filled" color="teal" radius="md" mt='md' fullWidth>
                Pay Now
              </Button>
              <Button variant="filled" color="red" radius="md" mt='sm' fullWidth onClick={() => setModalBilled(false)}>
                Cancel
              </Button>

            </Paper>
          </Grid.Col>
        </Grid>
      </Modal>
      {/* ------------------------------------------------End Modal Billed-------------------------------------------------------- */}


    </Container>
  );
};
