import { Transform } from "class-transformer";
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

export class CreateMenuDto {
  @MinLength(3)
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  detail: string;

  @Min(0.01)
  @Max(1000)
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  price: number;
}

export class UpdateMenuDto extends PartialType(CreateMenuDto) {}
