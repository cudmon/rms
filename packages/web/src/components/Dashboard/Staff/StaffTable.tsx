"use client";

import { TableEntity, Order } from "@/types/entity";
import {
  IconArmchair, IconTags, IconPackage, IconReceipt2, 
  IconX, IconChecks
} from "@tabler/icons-react";
import {
  Badge, Card, Center, Container, Text, Grid, Button, rem, Title, Modal, 
  Table, Tooltip, ActionIcon, Paper, Radio, CheckIcon,
  useMantineTheme, Flex, ScrollArea
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { OrderModal } from "@/components/Dashboard/Staff/StaffModal/OrderModal";
import { http } from "@/modules/http";
import { Notifications,notifications } from '@mantine/notifications';
import { modals } from "@mantine/modals";
import '@mantine/notifications/styles.css';

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
  { id: 1, menu: "Burger", quantity: 5, price: 20 },
  { id: 2, menu: "Pizza", quantity: 3, price: 25 },
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
  const [value, setValue] = useState("react");
  const [ModalBilled, setModalBilled] = useState(false);
  const [values, onChange] = useState(true);
  const theme = useMantineTheme();

  const remove = (id: string, name: string) => {
    modals.openConfirmModal({
      title: (
        <Text fz={18} fw={500}>
          Cancel Reservation
        </Text>
      ),

      centered: true,

      labels: {
        confirm: "Confirm",
        cancel: "Cancel",
        
      },
      cancelProps: {
        radius: 15,
        color: "white",


      },

      confirmProps: {
        radius: 15,
        color: "red",
      },

      children: <Text>Are you sure you want to cancel <strong>{name}</strong> ?</Text>,

      onConfirm: async () => {
        try {
          const res_remove = await http().patch(`/reserved/${id}`);

          if (res_remove.status === 200) {
            Notifications.show({
              title: "Success",
              message: "User cancel successfully",
              color: "green",
            });
            setusers(table.filter((tables) => tables.id !== id));
          }
        } catch (e) {
          Notifications.show({
            title: "Error",
            message: "Something went wrong. Please try again later",
            color: "red",
          });
        }
      },
    });
  };

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
    <Container>
      <Title my="md" order={3} size="h1" fw={900} ta="center" >
        Table List
      </Title>
      
      <Grid >
        {table.map((table) => (
          <Grid.Col span={4} key={table.id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Grid columns={8} justify="center" align="center">
                <Grid.Col span={3.5}>
                <Center>
                  <Text
                    size="xl"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <IconTags style={{ width: rem(20), height: rem(20) }} /> :{" "}
                    {table.name}{" "}
                  </Text>
                  </Center>
                </Grid.Col>

                <Grid.Col span={3.5}>
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

                <Grid.Col span={1}> 
                <Flex
                  justify="center"
                  mih={50}
                  gap="xl"
                  align="center"
                  direction="row"
                  wrap="nowrap"
                >
                  {CheckCancelOrder(table.status) && (
                    <Tooltip label="Cancel Reserved   " position="top" offset={5}>
                    <ActionIcon radius="md" color="red" onClick={() => remove(table.id, table.name)}>
                      
                      <IconX  />{" "}
                    </ActionIcon>
                </Tooltip>
                  )}
                </Flex >
                </Grid.Col>
                <Grid columns={3} justify="center" align="center">
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


                </Grid>
     
                <Flex
                  justify="center"
                  mih={50}
                  gap="xl"
                  align="center"
                  direction="row"
                  wrap="nowrap"
                  mt="md"
                >
                  <Button
                    leftSection={
                      <IconPackage
                        size={14}
                        style={{ width: rem(20), height: rem(20) }}
                        color={theme.colors.blue[9]}
                        stroke={1.5}
                      />
                    }
                    radius={15}
                    onClick={() => setModalOpenOrder(true)}
                    variant="default"
                  >
                    Orders
                  </Button>
                  <Button
                    leftSection={
                      <IconReceipt2
                        size={14}
                        style={{ width: rem(20), height: rem(20) }}
                        color={theme.colors.green[9]}
                      />
                    }
                    color={theme.colors.blue[8]}
                    variant="default"
                    radius={15}
                    onClick={() => setModalBilled(true)}
                  >
                    Bill list
                  </Button>
                </Flex>

               

                
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
                    
            <Table stickyHeader verticalSpacing="sm" highlightOnHover withTableBorder >
              <ScrollArea h={400} type="always" offsetScrollbars scrollbarSize={12} scrollHideDelay={3000}>
                <Table.Thead>{headbilled}</Table.Thead>
                <Table.Tbody>{rowsbilled}</Table.Tbody>
              </ScrollArea>
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
                <Radio icon={CheckIcon} value="ng" color="blue.5" label="Bank" mt='md' />
              </Radio.Group>

              <Button variant="filled" color="teal" radius="md" mt='md' fullWidth
                onClick={() =>
                  notifications.show({
                    title: 'Confirm payment successful !!',
                    message: 'Thank you for ordering food',
                    icon: <IconChecks style={{ width: rem(18), height: rem(18) }} />
                  })
                }>
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
function setusers(arg0: any) {
  throw new Error("Function not implemented.");
}

