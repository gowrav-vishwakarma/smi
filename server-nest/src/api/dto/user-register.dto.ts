import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  languagesSpeaks: string[];

  @IsNotEmpty()
  @ApiProperty()
  accountType: string;

  @IsNotEmpty()
  @ApiProperty({ default: ['IT', 'Media'] })
  topicsInterestedIn: string[];
}
