import { IsMongoId, IsString } from "class-validator";

export default class InitiateCallDTO {
  @IsString()
  content!: string;
  @IsMongoId()
  to!: string;
}
