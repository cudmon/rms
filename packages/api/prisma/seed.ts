import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});
  await prisma.billing.deleteMany({});
  await prisma.menu.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.reservation.deleteMany({});
  await prisma.usage.deleteMany({});
  await prisma.table.deleteMany({});

  await prisma.user.createMany({
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

  await prisma.menu.createMany({
    data: [
      {
        name: "Burger",
        price: 10,
        image: "burger.png",
      },
      {
        name: "Pizza",
        price: 20,
        image: "pizza.png",
      },
      {
        name: "Pasta",
        price: 15,
        image: "pasta.png",
      },
    ],
  });

  await prisma.table.createMany({
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
