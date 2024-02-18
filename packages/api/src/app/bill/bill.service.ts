import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { UsageService } from "@/app/usage/usage.service";
import { PrismaService } from "@/providers/prisma.service";
import { SettingService } from "@/app/settings/setting.service";

@Injectable()
export class BillService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usageService: UsageService,
    private readonly settingService: SettingService
  ) {}

  async getBills(args?: Prisma.BillingFindManyArgs) {
    return await this.prisma.billing.findMany(args);
  }

  async getBill(billId: string) {
    return await this.prisma.billing.findUniqueOrThrow({
      where: {
        id: billId,
      },
    });
  }

  async createBill(tableId: string) {
    let usage;

    try {
      usage = await this.usageService.getActiveUsageWithOrders(tableId);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          throw new Error("NO_ACTIVE_USAGE");
        }
      }
    }

    const bill = await this.prisma.billing.findFirst({
      where: {
        usageId: usage.id,
      },
    });

    if (bill) {
      throw new Error("BILL_ALREADY_CREATED");
    }

    const tax = await this.settingService.getSettingByName("BILLING_TAX");
    const charge = await this.settingService.getSettingByName("SERVICE_CHARGE");

    let total = usage.order.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);

    total += (total * Number(charge.value)) / 100;
    total += (total * Number(tax.value)) / 100;

    return await this.prisma.billing.create({
      data: {
        usageId: usage.id,
        price: total,
      },
    });
  }

  async confirmBill(billId: string) {
    const bill = await this.getBill(billId);

    if (bill.status === "CANCELED") {
      throw new Error("BILL_ALREADY_CANCELLED");
    }

    return this.prisma.billing.update({
      where: {
        id: billId,
      },
      data: {
        status: "PAID",
      },
    });
  }

  async cancelBill(billId: string) {
    const bill = await this.getBill(billId);

    if (bill.status === "PAID") {
      throw new Error("BILL_ALREADY_CONFIRMED");
    }

    return this.prisma.billing.update({
      where: {
        id: billId,
      },
      data: {
        status: "CANCELED",
      },
    });
  }
}
