import { OrderService } from "@/app/order/order.service";
import { Controller } from "@nestjs/common";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
}
