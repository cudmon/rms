export type Table = {
  id: string;
  name: string;
};

export type Menu = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type User = {
  id: string;
  username: string;
  role: string;
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
  table: Table;
  order: Order[];
};

export type Cart = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};
