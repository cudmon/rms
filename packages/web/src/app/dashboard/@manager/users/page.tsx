import { http } from "@/modules/http";
import { Center } from "@mantine/core";
import { cookies } from "next/headers";
import {ManagerUser} from "@/components/Dashboard/@Manager/ManagerUser"
import {User} from "@/types/entity";


export const metadata = {
  title: "Manager",
};


export default async function Page() {
  let Users: User[] = [];
  try {
    const res = await http(cookies().get("token")?.value).get(
      "/users"
    );
    
    Users= res.data;
  } catch (e) {
    return (
      <Center py={64} fz={28} c="red" fw={500}>
        Something went wrong. Please try again later
      </Center>
    );
  }

  return (
    <div>
      <ManagerUser Employee= {Users} />
    </div>
  );



}







