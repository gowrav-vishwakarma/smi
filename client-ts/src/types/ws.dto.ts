import { IsMongoId, IsString } from "class-validator";

export class SocketAuthDTO {
  @IsMongoId()
  username!: string;
}

export class InitiateCallDTO {
  @IsMongoId()
  to!: string;

  @IsString()
  content!: string;
}
