import { Module } from "@nestjs/common";
import { MenuModule } from "@/app/menu/menu.module";
import { UsersModule } from "@/app/users/users.module";
import { AuthModule } from "@/app/auth/auth.module";
import { BillsModule } from "@/app/bills/bills.module";
import { TablesModule } from "@/app/tables/tables.module";
import { OrdersModule } from "@/app/orders/orders.module";
import { UsagesModule } from "@/app/usages/usages.module";
import { SettingModule } from "@/app/settings/setting.module";
import { ReservationModule } from "@/app/reservation/reservation.module";

@Module({
  imports: [
    MenuModule,
    UsersModule,
    AuthModule,
    TablesModule,
    OrdersModule,
    BillsModule,
    UsagesModule,
    SettingModule,
    ReservationModule,
  ],
})
export class AppModule {}
