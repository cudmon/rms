import { Register } from "@/components/Auth/Register";
import { Divider, Group, Text, Center, Card } from "@mantine/core";

export const metadata = {
  title: "Register",
};

export default function Page() {
  return (
    <>
      <Center py={52}>
        <Card withBorder>
          <Group>
            <Text fz={48} px={20} w={400} ta="center">
              Welcome to Restaurant.
            </Text>
            <Divider size="md" orientation="vertical" />
            <Register />
          </Group>
        </Card>
      </Center>
    </>
  );
}
