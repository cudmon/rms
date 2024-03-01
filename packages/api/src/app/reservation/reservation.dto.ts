import { IsDateString, IsNumber, IsUUID, Max, Min } from "class-validator";

export class MakeReservationDto {
  @IsNumber()
  @Min(1)
  @Max(12)
  seat: number;

  @IsUUID()
  tableId: string;

  @IsDateString()
  when: string;
}
