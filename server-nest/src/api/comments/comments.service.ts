import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { Comment, CommentDocument } from '../schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  createComment(createCommentDto: CreateCommentDTO) {}

  getComments(questionId: string) {}
}
