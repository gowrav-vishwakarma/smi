import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export default class RegisterUserDTO {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  languagesSpeaks!: string[];

  @IsNotEmpty()
  accountType!: string;

  @IsNotEmpty()
  topicsInterestedIn!: string[];

  @IsNotEmpty()
  @IsString()
  country!: string;
}
