import { IsString, IsNotEmpty, IsEmail, MinLength, isEmail } from "class-validator";

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  name: String;

  @IsString()
  phone: String;

  @IsEmail()
  email: String;

  @IsString()
  @MinLength(5)
  password: String;
}

export class SigninDto {
  @IsEmail()
  email : String

  @IsString()
  password : String
}