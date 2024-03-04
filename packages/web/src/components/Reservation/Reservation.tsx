import { Tables } from "./Table";
import { Table } from "@/types/entity";
import { Center, Card, Flex, Grid, GridCol, Text, Stack } from "@mantine/core";

type Props = {
  tables: Table[];
};

export const Reservation = ({ tables }: Props) => {
  return (
    <>
      <Center py={60}>
        <Stack>
          <Text ta="center" fz={36}>
            Tables in restaurant
          </Text>
          <Card withBorder w={800} h={500}>
            <Grid>
              {tables.map((table) => (
                <GridCol span={3} key={table.id} p={20}>
                  <Flex justify="center">
                    <Tables table={table} />
                  </Flex>
                </GridCol>
              ))}
            </Grid>
          </Card>
        </Stack>
      </Center>
    </>
  );
};
