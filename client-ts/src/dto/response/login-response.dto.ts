import { Type } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
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

  userToppics!: string[];
  userLanguages!: string[];
}

export default class LoginResponseDTO {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => UserDetails)
  user!: UserDetails;

  @IsNotEmpty()
  accessToken!: string;
}
