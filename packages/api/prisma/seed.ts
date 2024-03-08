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
        username: "manager",
        password: hashSync("manager", 10),
        name: "Elon Musk",
        role: "MANAGER",
        email: "manager@email.com",
        telephone: "1234567891",
      },
      {
        username: "chef",
        password: hashSync("chef", 10),
        name: "Bill Gates",
        role: "CHEF",
        email: "chef@email.com",
        telephone: "1234567892",
      },
      {
        username: "staff",
        password: hashSync("staff", 10),
        name: "Steve Jobs",
        role: "STAFF",
        email: "staff@email.com",
        telephone: "1234567893",
      },
      {
        username: "customer",
        password: hashSync("customer", 10),
        name: "Jeff Bezos",
        role: "CUSTOMER",
        email: "customer@email.com",
        telephone: "1234567894",
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
        passcode: hashSync("123456", 10),
      },
      {
        name: "B",
        seat: 2,
        passcode: hashSync("123456", 10),
      },
      {
        name: "C",
        seat: 10,
        passcode: hashSync("123456", 10),
      },
      {
        name: "D",
        seat: 6,
        passcode: hashSync("123456", 10),
      },
      {
        name: "E",
        seat: 8,
        passcode: hashSync("123456", 10),
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
        name: "MAX_TABLE_BOOKING",
        value: "10",
      },
    ],
  });
}

main();
