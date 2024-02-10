import { TableService } from "@/app/table/table.service";
import { Controller } from "@nestjs/common";

@Controller("table")
export class TableController {
  constructor(private readonly tableService: TableService) {}
}
