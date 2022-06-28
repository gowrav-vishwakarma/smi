import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsService } from './questions/questions.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { QuestionSchema } from './schemas/question.schema';
import { CommentSchema } from './schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Question', schema: QuestionSchema },
      { name: 'Comment', schema: CommentSchema },
    ]),
  ],
  controllers: [UsersController, QuestionsController, CommentsController],
  providers: [UsersService, QuestionsService, CommentsService],
  exports: [UsersService, MongooseModule],
})
export class ApiModule {}
