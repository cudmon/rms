import { BillService } from "@/app/bill/bill.service";
import { Controller } from "@nestjs/common";

@Controller("bill")
export class BillController {
  constructor(private readonly billService: BillService) {}
}
