import { hashSync } from "bcrypt";
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
  await prisma.setting.deleteMany({});

  await prisma.user.createMany({
    data: [
      {
        username: "alex",
        password: hashSync("alex", 10),
        name: "Alex",
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
        passcode: "1234",
      },
      {
        name: "B",
        seat: 2,
        passcode: "1234",
      },
      {
        name: "C",
        seat: 10,
        passcode: "1234",
      },
    ],
  });

  await prisma.setting.createMany({
    data: [
      {
        name: "OPENING_TIME",
        value: "09:00",
      },
      {
        name: "CLOSING_TIME",
        value: "22:00",
      },
      {
        name: "RESERVATION_LIMIT_PER_USER",
        value: "1",
      },
      {
        name: "RESERVATION_MAX_DAY",
        value: "7",
      },
      {
        name: "RESERVATION_MIN_DAY",
        value: "1",
      },
      {
        name: "BILLING_TAX",
        value: "10",
      },
      {
        name: "SERVICE_CHARGE",
        value: "10",
      },
      {
        name: "CURRENCY",
        value: "USD",
      },
      {
        name: "MAX_TABLE_BOOKING_PERCENTAGE",
        value: "50",
      },
    ],
  });
}

main();
