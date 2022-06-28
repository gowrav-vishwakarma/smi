import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class GetQuestionsDTO {
  @IsOptional()
  @ApiPropertyOptional({ default: ['IT', 'Media'] })
  topics: string[];

  @IsOptional()
  @ApiPropertyOptional({ default: ['VueJS', 'NodeJs'] })
  tags: string[];

  @IsOptional()
  @ApiPropertyOptional({ default: ['Hindi', 'English'] })
  languages: string[];

  @IsOptional()
  @ApiPropertyOptional({ default: null })
  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === 'true')
  // @Type(() => Boolean)
  hasComments: boolean;

  @IsOptional()
  @ApiPropertyOptional({ default: null })
  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === 'true')
  availableOnChatChannel: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ default: null })
  @Transform(({ obj, key }) => obj[key] === 'true')
  availableOnScreenShare: boolean;

  @IsOptional()
  @ApiPropertyOptional({ default: null })
  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === 'true')
  availableOnVideoCall: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ default: null })
  @Transform(({ obj, key }) => obj[key] === 'true')
  availableOnAudioCall: boolean;

  @IsOptional()
  @ApiPropertyOptional({ default: null })
  @IsNumber()
  page: number;
}
