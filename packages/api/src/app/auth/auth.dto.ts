import { Transform } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Transform(({ value }) => value.toLowerCase())
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  @MaxLength(10)
  telephone: string;
}

export class LogInDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class TableLoginDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  passcode: string;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(8)
  newPassword: string;
}