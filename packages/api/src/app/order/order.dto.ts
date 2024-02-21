import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsUUID, Max, Min } from "class-validator";

export class CreateOrderDto {
  @Min(0)
  @Max(100)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsUUID()
  @IsNotEmpty()
  menuId: string;

  @IsUUID()
  @IsNotEmpty()
  tableId: string;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
