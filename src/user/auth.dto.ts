import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

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
