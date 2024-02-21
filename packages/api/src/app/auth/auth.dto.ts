import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class RegisterDto {
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

export class LogInDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
