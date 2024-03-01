import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";
import { TablesService } from "@/app/tables/tables.service";
import { UsagesService } from "@/app/usages/usages.service";
import { SettingService } from "@/app/settings/setting.service";

@Injectable()
export class BillsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usagesService: UsagesService,
    private readonly settingService: SettingService,
    private readonly tablesService: TablesService
  ) {}

  async findAll(params: { take?: number; skip?: number }) {
    return await this.prisma.billing.findMany(params);
  }

  async findById(id: string) {
    return await this.prisma.billing.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async createBill(tableId: string) {
    const usage = await this.usagesService.findActive(tableId);

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

  async confirm(id: string) {
    const bill = await this.findById(id);

    if (bill.status === "CANCELED") {
      throw new Error("BILL_ALREADY_CANCELLED");
    }

    const paid = await this.prisma.billing.update({
      where: {
        id,
      },
      data: {
        status: "PAID",
      },
      include: {
        usage: {
          include: {
            table: true,
          },
        },
      },
    });

    await this.tablesService.updateStatusById(paid.usage.tableId, "IDLE");

    return paid;
  }

  async cancel(id: string) {
    const bill = await this.findById(id);

    if (bill.status === "PAID") {
      throw new Error("BILL_ALREADY_CONFIRMED");
    }

    return this.prisma.billing.update({
      where: {
        id,
      },
      data: {
        status: "CANCELED",
      },
    });
  }
}
