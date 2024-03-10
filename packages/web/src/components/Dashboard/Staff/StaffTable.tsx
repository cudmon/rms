"use client";

import { TableEntity, Order } from "@/types/entity";
import { IconArmchair, IconTags, IconUserEdit, IconCheck, IconCreditCard, IconBuildingBank, IconChevronDown, IconPackage, IconReceipt2, IconXboxX } from "@tabler/icons-react";
import {
  Badge, Card, Center, Container, Text, Grid, Button, rem, Title, Modal, TextInput, Box, SimpleGrid, Table, Tooltip,
  ActionIcon, Paper, Radio, CheckIcon, UnstyledButton, Checkbox, Divider, Menu, useMantineTheme
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { OrderModal } from "@/components/Dashboard/Staff/StaffModal/OrderModal";

const Ordersz = [
  {
    id: "1",
    menu: ["ข้าวไก่ย่าง"],
    price: 150,
    quantity: 2,
    status: "PENDING",
  },
  {
    id: "2",
    menu: ["ข้าวหมูกระเทียม", "ข้าวหมูกระเทียม"],
    price: 205,
    quantity: 2,
    status: "SERVED",
  },
  {
    id: "3",
    menu: ["ข้าวมันไก่"],
    price: 100,
    quantity: 2,
    status: "FINISHED",
  },
  {
    id: "4",
    menu: ["ข้าวหน้าเป็ด"],
    price: 100,
    quantity: 3,
    status: "CANCELED",
  },
  {
    id: "5",
    menu: ["ข้าวหน้าเนื้อ"],
    price: 150,
    quantity: 1,
    status: "FINISHED",
  },
  {
    id: "6",
    menu: ["ข้าวหมูทอด"],
    price: 100,
    quantity: 2,
    status: "COMPLETED",
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
  const theme = useMantineTheme();
  

  const CheckCancelOrder = (status: string) => {
    if (status === "RESERVED") {
      return true;
    }
    return false;
  };
 

  

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
                <Grid.Col span={4}>
                    <div style={{ display: 'grid', placeItems: 'center', }}>
                    <Menu
                      transitionProps={{ transition: "pop-top-right" }}
                      
                      position="bottom-start"
                      width={220}
                      withinPortal
                      
                    >
                      <Menu.Target>
                        <Button
                         radius={12}
                         color={theme.colors. blue[6]}
                          rightSection={
                            <IconChevronDown
                              style={{ width: rem(18), height: rem(18) }}
                              stroke={1.5}

                            />
                          }
                          pr={12}
                        >
                        Options
                        </Button>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={
                            <IconPackage
                            style={{ width: rem(16), height: rem(16) }}
                            color={theme.colors. blue[9]}
                              stroke={1.5}
                            />
                          }
                          rightSection={
                            <Text size="xs"  fw={700} c="dimmed">
                              Order list
                            </Text>
                          }
                          color="blue.9"
                          onClick={() => setModalOpenOrder(true)}
                        >
                          ORDER
                        </Menu.Item>
                        <Menu.Item
                          leftSection={
                            <IconReceipt2
                              style={{ width: rem(16), height: rem(16) }}
                              color={theme.colors.green[6]}
                              stroke={1.5}
                            />
                          }
                          rightSection={
                            <Text size="xs"  fw={700} c="dimmed">
                              Bill list
                            </Text>
                          }
                          color="green.6"
                          onClick={() => setModalBilled(true) }
                        >
                          BILL
                        </Menu.Item>
                        
                        {CheckCancelOrder(table.status) && 
          (
                        <Menu.Item
                          leftSection={
                            <IconXboxX
                              style={{ width: rem(16), height: rem(16) }}
                              color={theme.colors.red[6]}
                              stroke={1.5}
                            />
                          }
                          rightSection={
                            <Text size="xs"  fw={700} c="dimmed" >
                             Reservation
                            </Text>
                          }
                          color="red.6"
                          // onClick={close}
                        >
                          CANCEL
                        </Menu.Item>
                         )}
                      </Menu.Dropdown>
                    </Menu>
                    </div>
                    </Grid.Col>
                
              </Grid>
            </Card>
          </Grid.Col>
          // ----------------------------------------------End Table list --------------------------------------------------------
        ))}
      </Grid>
      {/* -------------------------------------------------- modal order-------------------------------------------------------- */}
      <OrderModal
        isOpen={ModalOpenOrder}
        onClose={() => setModalOpenOrder(false)}
        Ordersz={Ordersz}
      />
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
