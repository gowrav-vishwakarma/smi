import { Type } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import "reflect-metadata";

export class UserDetails {
  @IsNotEmpty()
  @IsString()
  _id!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

export default class RegisterUserResponseDTO {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => UserDetails)
  user!: UserDetails;

  @IsNotEmpty()
  message!: string;
}
