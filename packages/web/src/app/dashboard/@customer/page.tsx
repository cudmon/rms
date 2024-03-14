import { ReservationList } from "@/components/Dashboard/Customer/ReservationList";

export const metadata = {
  title: "Customer",
};

export default async function Page() {
    return (
    <div>
      <ReservationList />
    </div>
  );
}
