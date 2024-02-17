import { PartialType } from "@nestjs/mapped-types";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @MinLength(4)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  username: string;

  @MinLength(8)
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  password: string;

  @MinLength(3)
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(10)
  @MaxLength(10)
  @IsString()
  @IsNotEmpty()
  telephone: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
