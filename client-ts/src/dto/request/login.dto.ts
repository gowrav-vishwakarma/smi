import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export default class LoginDTO {
  @IsEmail()
  username!: string;

  @IsNotEmpty()
  password!: string;
}
