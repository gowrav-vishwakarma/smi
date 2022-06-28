import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  languagesSpeaks: string[];

  @IsNotEmpty()
  accountType: string;

  @IsNotEmpty()
  topicsInterestedIn: string[];
}
