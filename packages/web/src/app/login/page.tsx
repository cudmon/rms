import { LoginForm } from "@/components/Login/LoginForm";
import { Center } from "@mantine/core";

export const metadata = {
  title: "Login",
};

export default async function Page() {
  return (
    <>
      <Center py={100}>
        <LoginForm />
      </Center>
    </>
  );
}
