import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
@ApiTags('Comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/create')
  async createComment(@Body() createCommentDTO: CreateCommentDTO) {
    return await this.commentsService.createComment(createCommentDTO);
  }

  @Get('/vote/:id')
  async vote(@Param('id') id: string) {
    return 'TODO';
  }
}
