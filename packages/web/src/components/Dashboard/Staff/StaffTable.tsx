"use client";

import { TableEntity, Order, Usage } from "@/types/entity";
import {
  IconArmchair,
  IconTags,
  IconReceipt2,
  IconAddressBookOff,
  IconNotes,
  IconUser,
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
  Modal,
  Table,
  Tooltip,
  Paper,
  Radio,
  CheckIcon,
  useMantineTheme,
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
  const [bill, setBill] = useState<Order[]>([]);
  const [tableName, setTableName] = useState<string>("");

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

  const handleOrder = async (tableId: string , tableName : string) => {
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

  const handleBill = async (tableId: string , tableName : string) => {
    try {
      const res = await http().get(`/usages/active/bill/${tableId}`);
      const usage = res.data as Usage;
      const order = usage.order;
      const sumOrder : Order[] = [];
      order.forEach((item) => {
        const existing = sumOrder.find((x) => x.menu.id === item.menu.id);
        if (existing) {
          existing.quantity += item.quantity;
          existing.price += item.price;
        } else {
          sumOrder.push({ ...item });
        }
      });
      setBill(sumOrder);
      setTableName(tableName);
      setModalBilled(true);


    } catch (error) {
      if (error instanceof AxiosError) {
        setBill([]);
        setTableName(tableName);
        setModalBilled(true);
      }
    }
  }

  const ConfirmPayment = (id: string) => {

    console.log(id);
  }



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
  }

  const CancelReservation = (id: string, customer: string, table: string) => {
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

      children: (
        <Text>
          Are you sure you want to cancel reservation by{" "}
          <strong>{customer}</strong> on table <strong>{table}</strong> ?
        </Text>
      ),

      onConfirm: async () => {
        try {
          const res_cancel = await http().patch(`/tables/idle/${id}`);

          if (res_cancel.status === 200) {
            Notifications.show({
              title: "Success",
              message: "User cancel successfully",
              color: "green",
            });
            setTables(
              tables.map((table) =>
                table.id === id ? { ...table, status: "IDLE" } : table
              )
            );
          }
        } catch (e) {
          console.log(e);
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

 
  return (
    // --------------------------------------------------Table list--------------------------------------------------------
    <Container>
      <Title my="md" order={3} size="h1" fw={900} ta="center">
        Table List
      </Title>

      <Grid>
        {tables.map((table) => (
          <Grid.Col span={4} key={table.id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Grid columns={6} justify="flex-start" align="center">
                <Grid.Col span={3}>
                  <Text
                    size="xl"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <IconTags style={{ width: rem(20), height: rem(20) }} /> :{" "}
                    {table.name}{" "}
                  </Text>
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

                <Grid.Col span={6}>
                  <Text
                    size="xl"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <IconUser style={{ width: rem(20), height: rem(20) }} /> :
                    {table.status !== "RESERVED" ? "  " : " Pongporn"}
                  </Text>
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

                <Grid.Col span={4}>
                  <center>
                    <Button.Group>
                      <Tooltip label="Order List" position="top" offset={5}>
                        <Button
                          variant="default"
                          px="sm"
                          radius="md"
                          onClick={() => handleOrder(table.id , table.name)}
                        >
                          <IconNotes
                            size={140}
                            color={theme.colors.blue[9]}
                            stroke={1.5}
                          />
                        </Button>
                      </Tooltip>
                      <Tooltip label="Bill List" position="top" offset={5}>
                        <Button variant="default" px={"sm"} radius={"md"}
                        onClick={() => handleBill(table.id , table.name)}
                        >
                          <IconReceipt2
                            size={140}
                            color={theme.colors.green[9]}
                            stroke={1.5}
                          />
                        </Button>
                      </Tooltip>
                      <Tooltip
                        label="Cancel Reserved   "
                        position="top"
                        offset={5}
                      >
                        <Button
                          variant="default"
                          px={"sm"}
                          radius={"md"}
                          onClick={() =>
                            CancelReservation(table.id, "Pongporn", table.name)
                          }
                          disabled={!CheckCancelOrder(table.status)}
                        >
                          <IconAddressBookOff
                            size={140}
                            color={
                              CheckCancelOrder(table.status)
                                ? theme.colors.red[9]
                                : theme.colors.gray[5]
                            }
                            stroke={1.5}
                          />
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
        ServedOrder={bill}
        CreateBill={ConfirmPayment}
        tableName={tableName}
        
    
      />
      {/* ------------------------------------------------End Modal Billed-------------------------------------------------------- */}
    </Container>
  );
};
