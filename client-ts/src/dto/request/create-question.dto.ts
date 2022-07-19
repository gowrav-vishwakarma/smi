import { Transform } from "class-transformer";
import { IsBoolean, IsDefined, IsOptional, IsString } from "class-validator";

class SolutionChannelsDTO {
  @IsBoolean()
  @Transform(({ obj, key }) => {
    return obj[key] === "true";
  })
  comments!: boolean;

  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === "true")
  chat!: boolean;

  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === "true")
  screenShare!: boolean;

  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === "true")
  audioCall!: boolean;

  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === "true")
  videoCall!: boolean;
}

export class CreateQuestionDTO {
  @IsDefined()
  // @Transform(({ obj, key }) => {
  //   if (typeof obj[key] === 'string') return obj[key]?.split(',');
  //   return obj[key];
  // })
  topic!: string;

  @IsString()
  title!: string;

  @IsString()
  detail!: string;

  @IsDefined()
  @Transform(({ obj, key }) => {
    if (typeof obj[key] === "string") return obj[key]?.split(",");
    return obj[key];
  })
  tags!: string[];

  @IsDefined()
  @Transform(({ obj, key }) => {
    if (typeof obj[key] === "string") return obj[key]?.split(",");
    return obj[key];
  })
  languages!: string[];

  //   @Type(() => SolutionChannelsDTO)
  @Transform(({ obj, key }) => {
    if (typeof obj[key] === "string") return JSON.parse(obj[key]);
    return obj[key];
  })
  @IsDefined()
  //   @ValidateNested()
  solutionChannels!: SolutionChannelsDTO;

  @IsOptional()
  video!: string;
}
