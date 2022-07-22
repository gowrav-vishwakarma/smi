import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/api/schemas/user.schema';
import { Question } from 'src/api/schemas/question.schema';

export type SolutionOfferDocument = SolutionOffer & Document;

@Schema()
export class SolutionOffer {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  questionId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Question' })
  question: Question;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  questionerId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  userId: string;

  @Prop({ required: false })
  notes: string;

  @Prop({ required: true, default: Date.now() })
  createdAt: Date;
}

export const SolutionOfferSchema = SchemaFactory.createForClass(SolutionOffer);
