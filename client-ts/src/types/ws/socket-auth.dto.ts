import { IsMongoId } from "class-validator";

export default class SocketAuthDTO {
  @IsMongoId()
  username!: string;
}
