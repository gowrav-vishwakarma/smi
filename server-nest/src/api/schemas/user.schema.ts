import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

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

@Schema({ _id: false })
class questionerRaputation {
  @Prop({ type: Number, default: 0 })
  totalQuestionsAsked: number;

  @Prop({ type: Number, default: 0 })
  totalMarkedSolved: number;

  @Prop({ type: Number, default: 0 })
  totalRatingsCount: number;

  @Prop({ type: Number, default: 0 })
  totalRatingsSum: number;
}

const questionerRaputationDefaults = {
  totalQuestionsAsked: 0,
  totalMarkedSolved: 0,
  totalRatingsCount: 0,
  totalRatingsSum: 0,
};

@Schema({ _id: false })
class solverRating {
  @Prop({ type: Number, default: 0 })
  totalOfferingCount: number;

  @Prop({ type: Number, default: 0 })
  totalRatingCount: number;

  @Prop({ type: Number, default: 0 })
  totalRatingSum: number;

  @Prop({ type: Number, default: 0 })
  totalCommentsCount: number;

  @Prop({ type: Number, default: 0 })
  totalCommentsVoteCount: number;
}

const solverRatingDefaults = {
  totalOfferingCount: 0,
  totalRatingCount: 0,
  totalRatingSum: 0,
  totalCommentsCount: 0,
  totalCommentsVoteCount: 0,
};

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, unique: true })
  username: string;

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
  reputationAsQuestioner: Record<string, any>;

  @Prop(
    raw({ type: solverRating, required: true, default: solverRatingDefaults }),
  )
  ratingAsSolver: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  this.username = this.email;
  next();
});
