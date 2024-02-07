import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateMenuDto {
  @Min(3)
  @Max(255)
  @IsNotEmpty()
  @ApiProperty({ required: true, example: "Burger" })
  name: string;

  @Min(1)
  @Max(255)
  @IsNotEmpty()
  @ApiProperty({ required: true, example: "https://example.com/image.jpg" })
  image: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 10.99 })
  price: number;
}

export class UpdateMenuDto {
  @Min(3)
  @Max(255)
  @IsNotEmpty()
  @ApiProperty({ required: true, example: "Burger" })
  name?: string;

  @Min(1)
  @Max(255)
  @IsNotEmpty()
  @ApiProperty({ required: true, example: "https://example.com/image.jpg" })
  image?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 10.99 })
  price?: number;
}
