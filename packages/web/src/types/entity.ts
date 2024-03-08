export type TableEntity = {
  id: string;
  name: string;
  seat: number;
  status: string;
  passcode: string;
};

export type Menu = {
  id: string;
  name: string;
  detail: string;
  price: number;
  image: string;
};

export type User = {
  id: string;
  username: string;
  name: string;
  role: string;
  email: string;
  telephone: string;
};

export type Order = {
  id: string;
  menu: Menu;
  price: number;
  quantity: number;
  status: "pending" | "completed";
};

export type Usage = {
  id: string;
  start: string;
  end: string | null;
  table: TableEntity;
  order: Order[];
};

export type Cart = {
  id: string;
  name: string;
  price: number;
  menuId: string;
  quantity: number;
};
