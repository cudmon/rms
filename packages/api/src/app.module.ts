import { Module } from "@nestjs/common";
import { MenuModule } from "@/app/menu/menu.module";
import { UserModule } from "@/app/user/user.module";
import { AuthModule } from "@/app/auth/auth.module";
import { BillModule } from "@/app/bill/bill.module";
import { TableModule } from "@/app/table/table.module";
import { OrderModule } from "@/app/order/order.module";
import { UsageModule } from "@/app/usage/usage.module";
import { SettingModule } from "@/app/settings/setting.module";
import { ReservationModule } from "@/app/reservation/reservation.module";

@Module({
  imports: [
    MenuModule,
    UserModule,
    AuthModule,
    TableModule,
    OrderModule,
    BillModule,
    UsageModule,
    SettingModule,
    ReservationModule,
  ],
})
export class AppModule {}
