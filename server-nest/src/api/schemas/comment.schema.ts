import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/api/schemas/user.schema';
import { Question } from 'src/api/schemas/question.schema';

export type CommentDocument = Comment & Document;

const commentValue = {
  totalVoteCount: { type: Number, default: 0 },
};

@Schema()
export class Comment {
  @Prop({ required: true })
  detail: string;

  @Prop(raw({ type: commentValue, required: true }))
  commentValue: Record<string, any>;

  @Prop({ required: true, default: Date.now() })
  createdAt: Date;

  @Prop({ required: true })
  questionId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Question' })
  question: Question;

  @Prop({ required: true })
  commenterId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  commenter: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
