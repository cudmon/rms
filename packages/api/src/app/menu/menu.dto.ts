import { PartialType } from "@nestjs/swagger";
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

  @MinLength(3)
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  image: string;

  @Min(1)
  @Max(1000)
  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class UpdateMenuDto extends PartialType(CreateMenuDto) {}
