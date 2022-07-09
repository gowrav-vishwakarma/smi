import { forwardRef, Module } from '@nestjs/common';
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
import { AuthModule } from 'src/auth/auth.module';
import { MediaService } from './media/media.service';
import { MediaController } from './media/media.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Question', schema: QuestionSchema },
      { name: 'Comment', schema: CommentSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [
    QuestionsController,
    CommentsController,
    UsersController,
    MediaController,
  ],
  providers: [QuestionsService, CommentsService, UsersService, MediaService],
  exports: [UsersService, MongooseModule],
})
export class ApiModule {}
