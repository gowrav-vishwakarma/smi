import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class SolutionChannelsDTO {
  @IsBoolean()
  @ApiProperty({ default: true })
  @Transform(({ obj, key }) => {
    return obj[key] === 'true';
  })
  comments: boolean;

  @IsBoolean()
  @ApiProperty({ default: true })
  @Transform(({ obj, key }) => obj[key] === 'true')
  chat: boolean;

  @IsBoolean()
  @ApiProperty({ default: true })
  @Transform(({ obj, key }) => obj[key] === 'true')
  screenShare: boolean;

  @IsBoolean()
  @ApiProperty({ default: true })
  @Transform(({ obj, key }) => obj[key] === 'true')
  audioCall: boolean;

  @IsBoolean()
  @ApiProperty({ default: true })
  @Transform(({ obj, key }) => obj[key] === 'true')
  videoCall: boolean;
}

export class CreateQuestionDTO {
  @IsDefined()
  @ApiProperty({ default: ['IT', 'Media'] })
  @Transform(({ obj, key }) => {
    if (typeof obj[key] === 'string') return obj[key]?.split(',');
    return obj[key];
  })
  topics: string[];

  @IsString()
  @ApiProperty({ default: 'Question title here' })
  title: string;

  @IsString()
  @ApiProperty({ default: 'Question Details here ' })
  detail: string;

  @IsDefined()
  @ApiProperty({ default: ['VueJS', 'NodeJs'] })
  @Transform(({ obj, key }) => {
    if (typeof obj[key] === 'string') return obj[key]?.split(',');
    return obj[key];
  })
  tags: string[];

  @IsDefined()
  @ApiProperty({ default: ['Hindi', 'English'] })
  @Transform(({ obj, key }) => {
    if (typeof obj[key] === 'string') return obj[key]?.split(',');
    return obj[key];
  })
  languages: string[];

  @Type(() => SolutionChannelsDTO)
  @Transform(({ value, key }) => {
    if (typeof value === 'string') return JSON.parse(value);
    return value;
  })
  @IsDefined()
  //   @ValidateNested()
  @ApiProperty({
    default: {
      comments: true,
      chat: true,
      screenShare: true,
      audioCall: true,
      videoCall: true,
    },
    required: true,
  })
  solutionChannels!: SolutionChannelsDTO;

  @IsOptional()
  @ApiPropertyOptional({ type: String, format: 'binary' })
  video: string;
}