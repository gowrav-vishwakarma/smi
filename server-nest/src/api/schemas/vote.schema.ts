import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/api/schemas/user.schema';
import { Question } from 'src/api/schemas/question.schema';

export type VoteDocument = Vote & Document;

@Schema()
export class Vote {
  @Prop({ required: true, default: 1 })
  vote: number;

  @Prop({ required: true, default: Date.now() })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  commentId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  questionId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Question' })
  question: Question;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
