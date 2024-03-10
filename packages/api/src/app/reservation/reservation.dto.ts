import { IsDateString, IsNumber, IsUUID, Max, Min } from "class-validator";

export class MakeReservationDto {
  @IsUUID()
  tableId: string;

  @IsDateString()
  when: string;
}
