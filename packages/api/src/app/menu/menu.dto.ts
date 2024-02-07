import { ApiProperty, PartialType } from "@nestjs/swagger";
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
  @ApiProperty({ required: true, example: "Burger" })
  name: string;

  @MinLength(3)
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: "https://example.com/image.jpg" })
  image: string;

  @Min(1)
  @Max(1000)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 10.99 })
  price: number;
}

export class UpdateMenuDto extends PartialType(CreateMenuDto) {}
