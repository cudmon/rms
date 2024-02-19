import { PartialType } from "@nestjs/mapped-types";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateTableDto {
  @MinLength(2)
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Min(0)
  @Max(12)
  @IsNumber()
  @IsNotEmpty()
  seat: number;

  @MinLength(6)
  @MaxLength(6)
  @IsString()
  @IsNotEmpty()
  passcode: string;
}

export class UpdateTableDto extends PartialType(CreateTableDto) {}
