import { hashSync } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});
  await prisma.billing.deleteMany({});
  await prisma.menu.deleteMany({});
  await prisma.order.deleteMany({});
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
        name: "NAME",
        value: "RMS",
        type: "STRING",
      },
      {
        name: "BILLING_TAX",
        value: "10",
        type: "NUMBER",
      },
      {
        name: "SERVICE_CHARGE",
        value: "10",
        type: "NUMBER",
      },
    ],
  });
}

main();
