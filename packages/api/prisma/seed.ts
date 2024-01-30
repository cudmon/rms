import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  prisma.user.deleteMany({});
  prisma.billing.deleteMany({});
  prisma.menu.deleteMany({});
  prisma.order.deleteMany({});
  prisma.reservation.deleteMany({});
  prisma.usage.deleteMany({});
  prisma.table.deleteMany({});

  prisma.user.createMany({
    data: [
      {
        username: "alex",
        password: "alex",
        role: "MANAGER",
        email: "alex@rms.com",
        telephone: "1234567890",
      },
    ],
  });

  prisma.menu.createMany({
    data: [
      {
        name: "Burger",
        price: 10,
        image: ".",
      },
      {
        name: "Pizza",
        price: 20,
        image: ".",
      },
      {
        name: "Pasta",
        price: 15,
        image: ".",
      },
    ],
  });

  prisma.table.createMany({
    data: [
      {
        name: "A",
        seat: 4,
      },
      {
        name: "B",
        seat: 2,
      },
      {
        name: "C",
        seat: 10,
      },
    ],
  });
}

main();
