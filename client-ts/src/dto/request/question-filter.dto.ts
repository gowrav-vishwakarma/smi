import { Transform } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class FilterQuestionsDTO {
  @IsOptional()
  @Transform(({ obj, key }) => {
    if (typeof obj[key] === "string") return obj[key]?.split(",");
    return obj[key];
  })
  topics?: string[];

  @IsOptional()
  @Transform(({ obj, key }) => {
    if (typeof obj[key] === "string") return obj[key]?.split(",");
    return obj[key];
  })
  tags?: string[];

  @IsOptional()
  @Transform(({ obj, key }) => {
    if (typeof obj[key] === "string") return obj[key]?.split(",");
    return obj[key];
  })
  languages?: string[];

  @IsOptional()
  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === "true")
  // @Type(() => Boolean)
  hasComments?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === "true")
  availableOnChatChannel?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === "true")
  availableOnScreenShare?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === "true")
  availableOnVideoCall?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === "true")
  availableOnAudioCall?: boolean;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  query?: string;
}
