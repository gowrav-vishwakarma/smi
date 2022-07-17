import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export default class RegisterUserDTO {
  @IsEmail()
  username!: string;

  @IsNotEmpty()
  password!: string;
}
