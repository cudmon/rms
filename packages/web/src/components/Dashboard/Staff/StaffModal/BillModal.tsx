import React, { useState } from "react";
import { Order } from "@/types/entity";
import {
  Modal,
  Table,
  Grid,
  Paper,
  Text, rem,
  Button, Title, Group,
  Center, ScrollArea, Divider
} from "@mantine/core";
import {
  IconChecks
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/modules/http";
import { AxiosError } from "axios";
import { Notifications,notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

interface BillModalProps {
  isOpen: boolean;
  onClose: () => void;
  CreateBill: (id: string) => void;
  ServedOrder: Order[];
  tableName: string;
  tableID: string;
}

export const BillModal: React.FC<BillModalProps> = ({
  isOpen,
  onClose,
  CreateBill,
  ServedOrder,
  tableName,
  tableID
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
      <Modal opened={isOpen} onClose={onClose} title={<><span>Billed Table : </span><strong>{tableName}</strong></>} size="70%" centered>
        <Center py={64} fz={28} c="red" fw={500}>
          No order to billed
        </Center>
      </Modal>
    );
  }



  return (
    <Modal opened={isOpen} onClose={onClose} title={<><span>Billed Table : </span><strong>{tableName}</strong></>} size="70%" centered>
      <Grid mt="sm" align="stretch">
        <Grid.Col span="auto">
          <Table
            stickyHeader
            verticalSpacing="sm"
            highlightOnHover
            withTableBorder
          >
            <ScrollArea h={275} type="always" offsetScrollbars scrollbarSize={12} scrollHideDelay={3000}>
              <Table.Thead>{headbilled}</Table.Thead>
              <Table.Tbody>{rowsbilled}</Table.Tbody>
              </ScrollArea>
          </Table>
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper p="xl" withBorder radius="md">
            <Title order={3} ta='center'>
              RMS
            </Title>

            <Text fw={500} size="sm" c="dimmed" ta='center'>
              Bill/Payment System
            </Text>
            <Divider size="xs"  my='sm' />
            <Grid mt='md'>
              <Grid.Col span={6} py={0}>
                <Text size="sm">
                  Table :
                </Text>
              </Grid.Col>
              <Grid.Col span={12} py={0}>
                <Text size="sm">
                  Date/Time :
                </Text>
              </Grid.Col>
              <Grid.Col span={12} py={0}>
                <Divider size="xs"  my='sm' />
              </Grid.Col>
              <Grid.Col span={6} py={0}>
                <Text size="sm">
                  Total :
                </Text>
              </Grid.Col>
              <Grid.Col span={6} py={0}>
                  <Title order={3} ta='right'> $ 190.00 </Title>
              </Grid.Col>
            </Grid>

          </Paper>
          <Group justify="center" gap="xl" grow>
            <Button variant="filled" color="teal" radius="md" mt="md" onClick={
              () => CreateBill(tableID)
      
            }>
              Confirm
            </Button>
            <Button
              variant="filled"
              color="red"
              radius="md"
              mt="sm"
              onClick={onClose}>
              Cancel
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Modal>
  );
};

export default BillModal;