import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserOnlineStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  BUSY = 'BUSY',
}

export enum AccountTypes {
  INDIVIDUAL = 'INDIVIDUAL',
  BUSINESS = 'BUSINESS',
  AGENCY = 'AGENCY',
}

const questionerRaputation = {
  totalQuestionsAsked: { type: Number, default: 0 },
  totalMarkedSolved: { type: Number, default: 0 },
  totalRatingsCount: { type: Number, default: 0 },
  totalRatingsSum: { type: Number, default: 0 },
};

const questionerRaputationDefaults = {
  totalQuestionsAsked: 0,
  totalMarkedSolved: 0,
  totalRatingsCount: 0,
  totalRatingsSum: 0,
};

const solverRating = {
  totalOfferingCount: { type: Number, default: 0 },
  totalRatingCount: { type: Number, default: 0 },
  totalRatingSum: { type: Number, default: 0 },
  totalCommentsCount: { type: Number, default: 0 },
  totalCommentsVoteCount: { type: Number, default: 0 },
};

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  languagesSpeaks: string[];

  @Prop({
    required: true,
    enum: UserOnlineStatus,
    default: UserOnlineStatus.OFFLINE,
  })
  onlineStatus: string;

  @Prop({
    required: true,
    enum: AccountTypes,
    default: AccountTypes.INDIVIDUAL,
  })
  accountType: string;

  @Prop({ required: false })
  avatar: string;

  @Prop({ required: false })
  topicsInterestedIn: string[];

  @Prop(
    raw({
      type: questionerRaputation,
      required: true,
      default: questionerRaputationDefaults,
    }),
  )
  questionerRaputation: Record<string, any>;

  @Prop(raw({ type: solverRating, required: false }))
  solverRating: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
