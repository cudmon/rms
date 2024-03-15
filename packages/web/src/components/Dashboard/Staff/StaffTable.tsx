"use client";

import { TableEntity, Order, Usage, Bill } from "@/types/entity";
import {
  IconArmchair,
  IconTags,
  IconReceipt2,
  IconNotes,
} from "@tabler/icons-react";
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
  Tooltip,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { OrderModal } from "@/components/Dashboard/Staff/StaffModal/OrderModal";
import { BillModal } from "@/components/Dashboard/Staff/StaffModal/BillModal";
import { http } from "@/modules/http";
import { Notifications, notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

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

export const TableStaff = () => {
  const [ModalOpenOrder, setModalOpenOrder] = useState(false);
  const [value, setValue] = useState("react");
  const [ModalBilled, setModalBilled] = useState(false);
  const theme = useMantineTheme();

  const [tables, setTables] = useState<TableEntity[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [billOrder, setBillOrder] = useState<Order[]>([]);
  const [tableName, setTableName] = useState<string>("");
  const [billID, setbillID] = useState<string>("");

  const { isError, data } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      try {
        const res = await http().get("/tables");

        return res.data as TableEntity[];
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            return [];
          }
        }

        notifications.show({
          title: "Error",
          message: "Something went wrong. Please try again later",
          color: "red",
        });
      }
    },
  });

  useEffect(() => {
    if (data !== undefined) {
      setTables(data);
    }
  }, [data]);

  if (isError) {
    return (
      <Center py={64} fz={28} c="red" fw={500}>
        Error fetching Tables
      </Center>
    );
  }

  const handleOrder = async (tableId: string, tableName: string) => {
    try {
      const res = await http().get(`/usages/active/${tableId}`);
      const usage = res.data as Usage;
      setOrders(usage.order);
      setTableName(tableName);
      setModalOpenOrder(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        setOrders([]);
        setTableName(tableName);
        setModalOpenOrder(true);
      }
    }
  };

  const handleBill = async (tableId: string, tableName: string) => {
    try {
      const res = await http().post(`/bills`, { tableId });
      const bill = res.data as Bill;
      const res_usage = await http().get(`/usages/active/${tableId}`);
      const usage = res_usage.data as Usage;
      const order = usage.order;

      const sumOrder: Order[] = [];
      order.forEach((item) => {
        const existing = sumOrder.find((x) => x.menu.id === item.menu.id);
        if (existing) {
          existing.quantity += item.quantity;
          existing.price += item.price;
        } else {
          sumOrder.push({ ...item });
        }
      });

      setBillOrder(sumOrder);
      setTableName(tableName);
      setbillID(bill.id);

      setModalBilled(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        setBillOrder([]);
        setTableName(tableName);
        setModalBilled(true);
      }
    }
  };

  const ConfirmPayment = async (id: string) => {
    try {
      const res = await http().patch(`/bills/confirm/${id}`);
      if (res.status === 200) {
        notifications.show({
          title: "Success",
          message: "Payment confirmed successfully",
          color: "green",
        });
        setModalBilled(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        notifications.show({
          title: "Error",
          message: "Something went wrong. Please try again later",
          color: "red",
        });
      }
    }
  };

  const CancelPayment = async (id: string) => {
    try {
      const res = await http().patch(`/bills/cancel/${id}`);
      if (res.status === 200) {
        notifications.show({
          title: "Success",
          message: "Payment canceled successfully",
          color: "green",
        });
      }
      setModalBilled(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        notifications.show({
          title: "Error",
          message: "Something went wrong. Please try again later",
          color: "red",
        });
      }
    }
  };

  const markAsServed = async (id: string) => {
    const res = await http().patch(`/orders/serve/${id}`);
    if (res.status === 200) {
      notifications.show({
        title: "Success",
        message: "Order served successfully",
        color: "green",
      });

      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, status: "SERVED" } : order
        )
      );
    }
  };
  return (
    // --------------------------------------------------Table list--------------------------------------------------------
    <Container>
      <Title my="md" order={3} size="h2" fw={900}>
        Table List
      </Title>

      <Grid>
        {tables.map((table) => (
          <Grid.Col span={4} key={table.id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Grid columns={7} justify="flex-start" align="center">
                <Grid.Col span={4}>
                  <Text
                    size="xl"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <IconTags style={{ width: rem(20), height: rem(20) }} /> :{" "}
                    {table.name}
                    {""}
                  </Text>
                </Grid.Col>

                <Grid.Col span={3}>
                  <Flex justify="flex-end">
                    <Badge
                      color={getStatusColor(table.status)}
                      variant="filled"
                      size="lg"
                    >
                      {table.status}
                    </Badge>
                  </Flex>
                </Grid.Col>

                <Grid.Col span={2}>
                  <Text
                    size="xl"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <IconArmchair style={{ width: rem(20), height: rem(20) }} />{" "}
                    : {table.seat}{" "}
                  </Text>
                </Grid.Col>

                <Grid.Col span={5}>
                  <center>
                    <Button.Group>
                      <Tooltip label="Order List" position="top" offset={5}>
                        <Button
                          size="xs"
                          variant="default"
                          px="sm"
                          radius="md"
                          onClick={() => handleOrder(table.id, table.name)}
                          leftSection={
                            <IconNotes
                              color={theme.colors.blue[9]}
                              stroke={1.5}
                            />
                          }
                        >
                          Order
                        </Button>
                      </Tooltip>
                      <Tooltip label="Bill List" position="top" offset={5}>
                        <Button
                          size="xs"
                          variant="default"
                          px={"sm"}
                          radius={"md"}
                          onClick={() => handleBill(table.id, table.name)}
                          leftSection={
                            <IconReceipt2
                              color={theme.colors.green[9]}
                              stroke={1.5}
                            />
                          }
                        >
                          Bill
                        </Button>
                      </Tooltip>
                    </Button.Group>
                  </center>
                </Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      {/* -------------------------------------------------- modal order-------------------------------------------------------- */}
      <OrderModal
        isOpen={ModalOpenOrder}
        onClose={() => setModalOpenOrder(false)}
        order={orders}
        tableName={tableName}
        markAsServed={markAsServed}
      />
      {/* ------------------------------------------------End modal order-------------------------------------------------------- */}

      {/* -------------------------------------------------- Modal Billed-------------------------------------------------------- */}
      <BillModal
        isOpen={ModalBilled}
        onClose={() => setModalBilled(false)}
        ServedOrder={billOrder}
        ConfirmBill={ConfirmPayment}
        CancelBill={CancelPayment}
        tableName={tableName}
        billID={billID}
      />
      {/* ------------------------------------------------End Modal Billed-------------------------------------------------------- */}
    </Container>
  );
};
