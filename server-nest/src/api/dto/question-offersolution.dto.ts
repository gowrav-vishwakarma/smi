import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';

export class QuestionOfferSolutionDTO {
  @IsMongoId()
  @ApiProperty()
  questionerId: string;

  @IsMongoId()
  @ApiProperty()
  questionId: string;

  @IsString()
  @ApiProperty({
    type: String,
    default: 'Intersted in this question',
  })
  notes: string;

  @IsString()
  @ApiProperty({
    type: [],
    default: [],
  })
  solutionChannel: [];
}
