import { ReactNode } from "react";

type Props = {
  chef: ReactNode;
  staff: ReactNode;
  manager: ReactNode;
  customer: ReactNode;
};

export default function Layout({ chef, staff, manager, customer }: Props) {
  return manager;
}
