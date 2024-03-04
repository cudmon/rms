import { Table } from "@/types/entity";
import { Reservation } from "@/components/Reservation/Reservation";

export const metadata = {
  title: "Reservation",
};

export default function Page() {
  const tables: Table[] = [
    {
      id: "1",
      name: "Table A",
      seat: 2,
      status: "IDLE",
    },
    {
      id: "2",
      name: "Table B",
      seat: 4,
      status: "IDLE",
    },
    {
      id: "3",
      name: "Table C",
      seat: 4,
      status: "IDLE",
    },
    {
      id: "4",
      name: "Table D",
      seat: 2,
      status: "IN-USE",
    },
    {
      id: "5",
      name: "Table E",
      seat: 2,
      status: "IDLE",
    },
    {
      id: "6",
      name: "Table F",
      seat: 2,
      status: "IN-USE",
    },
    {
      id: "7",
      name: "Table G",
      seat: 2,
      status: "IDLE",
    },
    {
      id: "8",
      name: "Table H",
      seat: 4,
      status: "IDLE",
    },
  ];

  return (
    <>
      <Reservation tables={tables} />
    </>
  );
}
