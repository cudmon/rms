import { IsNotEmpty, IsNumber, IsUUID, Max, Min } from "class-validator";

export class ReservationCreateDto {
  @Min(1)
  @Max(12)
  @IsNumber()
  @IsNotEmpty()
  seat: number;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  tableId: string;
}
