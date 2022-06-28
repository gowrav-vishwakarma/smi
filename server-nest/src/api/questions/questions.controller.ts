import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetQuestionsDTO } from '../dto/question-filter-query.dto';
import { QuestionDocument } from '../schemas/question.schema';
import { QuestionsService } from './questions.service';

@Controller('questions')
@ApiTags('Questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getQuestions(
    @Query() filterOptions: GetQuestionsDTO,
  ): QuestionDocument[] | any {
    return filterOptions;
  }
}
