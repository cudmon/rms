import React from "react";
import {  } from "@/types/entity";
import { IconCheck } from "@tabler/icons-react";
import { Badge, Card, Modal, Table, ActionIcon } from "@mantine/core";
interface Order {
    id: string;
    menu: string[];
    price: number;
    quantity: number;
    status: string;
  }
interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  Ordersz: Order[]; 

}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  Ordersz,
}) => {
  if (!isOpen) return null;

  const FinishOrder = (status: string) => {
    if (status === "FINISHED") {
      return true;
    }
    return false;
  };
 

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
        case "COMPLETED":
        badgeColor = "blue.7";
        break;
      default:
        break;
    }

    return (
      <Table.Tr key={item.id} ta="center">
        <Table.Td>{item.id}</Table.Td>
        <Table.Td>{item.menu.join(",")}</Table.Td>    
        <Table.Td>{item.quantity}</Table.Td>
        <Table.Td>{item.price}</Table.Td>
        <Table.Td>
          <Badge color={badgeColor} ta="center">
            {item.status}
          </Badge>
        </Table.Td>
        <Table.Td>
          {FinishOrder(item.status) && 
          (
            <Table.Td>
              <ActionIcon radius="md">
                <IconCheck  />{" "}
              </ActionIcon>
            </Table.Td>
          )}
        </Table.Td>
      </Table.Tr>
    );
  });

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
