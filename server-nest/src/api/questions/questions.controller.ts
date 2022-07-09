import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateQuestionDTO } from '../dto/create-question.dto';
import { GetQuestionsDTO } from '../dto/question-filter-query.dto';
import { MediaService } from '../media/media.service';
import { QuestionDocument } from '../schemas/question.schema';
import { QuestionsService } from './questions.service';

@Controller('questions')
@ApiTags('Questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly mediaService: MediaService,
  ) {}

  @Get()
  @UsePipes(ValidationPipe)
  getQuestions(
    @Query() filterOptions: GetQuestionsDTO,
  ): QuestionDocument[] | any {
    return this.questionsService.searchQuestions(filterOptions);
  }

  @Get(':id')
  questionDetail(@Param('id') id: string) {
    return this.questionsService.getdetailedQuestion(id);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('video'))
  async askQuestion(
    @GetUser() user: any,
    @Body() question: CreateQuestionDTO,
    @UploadedFile() video: Express.Multer.File,
  ) {
    const questionData = { ...question, questionerId: user._id };
    return await this.questionsService.createQuestion(questionData);
  }

  @Get('/vote/:id')
  async vote(@Param('id') id: string) {
    return 'TODO';
  }
}
