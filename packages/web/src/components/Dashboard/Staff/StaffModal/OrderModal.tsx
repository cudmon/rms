import React from "react";
import {Order } from "@/types/entity";
import { IconCheck } from "@tabler/icons-react";
import {
  Badge,
  Card,
  Modal,
  Table,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/modules/http";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  markAsServed: (id: string) => void;
  order: Order[];
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  markAsServed,
  order,
}) => {
  if (!isOpen) return null;

  const SortOrder = (order: Order[]) => {
    const servedOrders = order.filter((item) => item.status === "SERVED");
    const finishOrders = order.filter((item) => item.status === "FINISHED");
    const pendingOrders = order.filter((item) => item.status === "PENDING");
    const canceledOrders = order.filter((item) => item.status === "CANCELED");

    const mixOrder = [
      ...servedOrders,
      ...finishOrders,
      ...pendingOrders,
      ...canceledOrders,
    ];

    return mixOrder;
  };
  const SortedOrder = SortOrder(order);

  const rowsOrder = SortedOrder.map((item) => {
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
        <Table.Td>{SortedOrder.indexOf(item) + 1}</Table.Td>
        <Table.Td>{item.menu.name}</Table.Td>
        <Table.Td>{item.quantity}</Table.Td>
        <Table.Td>{item.price}</Table.Td>
        <Table.Td>
          <Badge color={badgeColor} ta="center">
            {item.status}
          </Badge>
        </Table.Td>
        <Table.Td>
          {item.status === "FINISHED" ? ( // Conditionally render ActionIcon
            <Tooltip label="Mark order as served" position="top" offset={5}>
              <ActionIcon radius="md" onClick={() => markAsServed(item.id)}>
                <IconCheck />
              </ActionIcon>
            </Tooltip>
          ) : (
            " "
          )}
        </Table.Td>
      </Table.Tr>
    );
  });

  const head = (
    <Table.Tr>
      <Table.Th ta="center">No.</Table.Th>
      <Table.Th ta="center">Menu Name</Table.Th>
      <Table.Th ta="center">Quantity</Table.Th>
      <Table.Th ta="center">Price</Table.Th>
      <Table.Th ta="center">Status</Table.Th>
      <Table.Th ta="center"></Table.Th>
    </Table.Tr>
  );

  return (
    <Modal opened={isOpen} onClose={onClose} title="Order" size="100%" centered>
      <Card shadow="md" padding="lg" radius="md" withBorder>
        <Table stickyHeader verticalSpacing="sm" highlightOnHover>
          <Table.Thead>{head}</Table.Thead>
          <Table.Tbody>{rowsOrder}</Table.Tbody>
        </Table>
      </Card>
    </Modal>
  );
};

export default OrderModal;
