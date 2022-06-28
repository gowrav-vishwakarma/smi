import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/api/schemas/user.schema';

export type QuestionDocument = Question & Document;

export enum QuestionStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  SOLVED = 'SOLVED',
}

// defines quesitions value in the system
const questionValue = {
  totalOfferingCount: { type: Number, default: 0 },
  totalVoteCount: { type: Number, default: 0 },
};

// defines questions possible solutions channels
const solutionChannels = {
  comments: { type: Boolean, default: true },
  chat: { type: Boolean, default: true },
  screenShare: { type: Boolean, default: true },
  audioCall: { type: Boolean, default: true },
  videoCall: { type: Boolean, default: true },
};

const solutionChannelsDefaults = {
  comments: true,
  chat: true,
  screenShare: true,
  audioCall: true,
  videoCall: true,
};

@Schema()
export class Question {
  @Prop({ required: true })
  topic: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  detail: string;

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true })
  video: string;

  @Prop({
    required: true,
    enum: QuestionStatus,
    default: QuestionStatus.OPEN,
  })
  status: string;

  @Prop(raw({ type: solutionChannels, default: solutionChannelsDefaults }))
  solutionChannels: Record<string, any>;

  @Prop(raw({ type: questionValue, required: true }))
  questionValue: Record<string, any>;

  @Prop({ required: true, default: Date.now() })
  createdAt: Date;

  @Prop({ required: true })
  questioinerId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  questioiner: User;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Comment' })
  comments: mongoose.Schema.Types.ObjectId[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
