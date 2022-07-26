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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateSolutionAttemptDTO } from '../dto/create-solution-attempt.dto';
import { SolutionAttemptedDocument } from '../schemas/solutionattempted.schema';
import { UserDocument } from '../schemas/user.schema';
import { SolutionAttemptService } from './attempt.service';

@Controller('solution-attempt')
export class SolutionAttemptController {
  constructor(
    private readonly solutionAttemptService: SolutionAttemptService,
  ) {}

  @Post('create')
  @ApiTags('SolutionAttempt')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async createAttempt(
    @GetUser() user: UserDocument,
    @Body() solutionAttemp: CreateSolutionAttemptDTO,
  ): Promise<SolutionAttemptedDocument> {
    return await this.solutionAttemptService.createAttempt(solutionAttemp);
  }
}
