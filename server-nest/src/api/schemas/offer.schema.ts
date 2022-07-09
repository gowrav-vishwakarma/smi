import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/api/schemas/user.schema';
import { Question } from 'src/api/schemas/question.schema';

export type OfferDocument = Offer & Document;

@Schema()
export class Offer {
  @Prop({ required: true })
  questionId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Question' })
  question: Question;

  @Prop({ required: true })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop({ required: false })
  notes: string;

  @Prop({ required: true, default: Date.now() })
  createdAt: Date;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
