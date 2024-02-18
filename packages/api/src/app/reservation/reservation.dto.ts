import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Max,
  Min,
} from "class-validator";

export class MakeReservationDto {
  @Min(1)
  @Max(12)
  @IsNumber()
  @IsNotEmpty()
  seat: number;

  @IsUUID()
  @IsNotEmpty()
  tableId: string;

  @IsDate()
  @IsNotEmpty()
  when: Date;
}
