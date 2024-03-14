import React, { useState } from "react";
import { Order } from "@/types/entity";
import { IconCheck } from "@tabler/icons-react";
import {
  Modal,
  Table,
  ActionIcon,
  Tooltip,
  Grid,
  Paper,
  Text,
  Title,
  Radio,
  Button,
  CheckIcon,
  useSafeMantineTheme,
  Center,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/modules/http";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";

interface BillModalProps {
  isOpen: boolean;
  onClose: () => void;
  CreateBill: (id: string) => void;
  ServedOrder: Order[];
    tableName: string;
}

export const BillModal: React.FC<BillModalProps> = ({
  isOpen,
  onClose,
  CreateBill,
  ServedOrder,
    tableName
}) => {
  const [value, setValue] = useState("cash");
  if (!isOpen) return null;
  

  const headbilled = (
    <Table.Tr>
      <Table.Th ta="center">No.</Table.Th>
      <Table.Th ta="center">Menu</Table.Th>
      <Table.Th ta="center">Price</Table.Th>
      <Table.Th ta="center">quantity</Table.Th>
    </Table.Tr>
  );

  const rowsbilled = ServedOrder.map((bill) => (
    <Table.Tr key={bill.id} ta="center">
      <Table.Td>{ServedOrder.indexOf(bill) + 1}</Table.Td>
      <Table.Td>{bill.menu.name}</Table.Td>
      <Table.Td>{bill.price}</Table.Td>
      <Table.Td>{bill.quantity}</Table.Td>
    </Table.Tr>
  ));

  if (rowsbilled.length === 0) {
    return (
        <Modal opened={isOpen} onClose={onClose} title={<><span>Billed Table : </span><strong>{tableName}</strong></>} size="100%" centered>
        <Center py={64} fz={28} c="red" fw={500}>
          No order to billed
        </Center>
      </Modal>
    );
  }

 

  return (
    <Modal opened={isOpen} onClose={onClose} title={<><span>Billed Table : </span><strong>{tableName}</strong></>} size="100%" centered>
      <Grid mt="md" align="stretch">
        <Grid.Col span="auto">
          <Table
            stickyHeader
            verticalSpacing="sm"
            highlightOnHover
            withTableBorder
          >
            <Table.Thead>{headbilled}</Table.Thead>
            <Table.Tbody>{rowsbilled}</Table.Tbody>
          </Table>
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper p="xl" withBorder radius="md">
            <Text fw={900} size="lg">
              Total Prices
            </Text>
            <Text>175.00</Text>
          </Paper>
          <Paper p="xl" mt="sm" withBorder radius="md">
            <Text fw={900} size="lg">
              Payments
            </Text>

            <Radio.Group
              value={value}
              onChange={setValue}
              name="payment"
              description="Select Payment Method"
            >
              <Radio
                icon={CheckIcon}
                value="cash"
                color="blue.5"
                label="Cash"
                mt="md"
              />
              <Radio
                icon={CheckIcon}
                value="svelte"
                color="blue.5"
                label="Credit / Debit Card"
                mt="md"
              />
              <Radio
                icon={CheckIcon}
                value="ng"
                color="blue.5"
                label="Bank"
                mt="md"
              />
            </Radio.Group>

            <Button variant="filled" color="teal" radius="md" mt="md" fullWidth>
              Pay Now
            </Button>
            <Button
              variant="filled"
              color="red"
              radius="md"
              mt="sm"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
          </Paper>
        </Grid.Col>
      </Grid>
    </Modal>
  );
};

export default BillModal;
