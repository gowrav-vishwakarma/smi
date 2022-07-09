import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDTO } from '../dto/create-question.dto';
import { GetQuestionsDTO } from '../dto/question-filter-query.dto';
import { VoteQuestionDTO } from '../dto/vote-question.dto';
import { Question, QuestionDocument } from '../schemas/question.schema';
import { UserDocument } from '../schemas/user.schema';
import { Vote, VoteDocument } from '../schemas/vote.schema';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(Vote.name)
    private readonly voteModel: Model<VoteDocument>,
  ) {}

  async createQuestion(question: CreateQuestionDTO): Promise<QuestionDocument> {
    const createdQuestion = new this.questionModel(question);
    return await createdQuestion.save();
  }

  async searchQuestions(
    filterOptions: GetQuestionsDTO,
    user?: any,
  ): Promise<QuestionDocument[] | any> {
    const { page = 1, sort = false } = filterOptions;
    const matchCondition = {};
    if (filterOptions.topics) {
      matchCondition['topic'] = { $in: filterOptions.topics };
    }
    if (filterOptions.tags) {
      matchCondition['tags'] = { $in: filterOptions.tags };
    }

    const questions = await this.questionModel.aggregate([
      {
        $match: matchCondition,
      },
      // {
      //   $lookup: {
      //     from: 'comments',
      //     localField: '_id',
      //     foreignField: 'questionId',
      //     as: 'comments',
      //   },
      // },
      // {
      //   $lookup: {
      //     from: 'votes',
      //     localField: '_id',
      //     foreignField: 'questionId',
      //     as: 'votes',
      //   },
      // },
      // {
      //   $lookup: {
      //     from: 'offers',
      //     localField: '_id',
      //     foreignField: 'questionId',
      //     as: 'offers',
      //   },
      // },
      // { $addFields: { commentsCount: { $size: '$comments' } } },
      // { $addFields: { votesCount: { $size: '$votes' } } },
      // { $addFields: { offersCount: { $size: '$offers' } } },
    ]);
    return questions;
  }

  async getdetailedQuestion(
    id: string,
    user?: UserDocument,
  ): Promise<QuestionDocument> {
    const questions = await this.questionModel.aggregate([
      {
        $match: { _id: ObjectId(id) },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'questionId',
          as: 'comments',
        },
      },
      {
        $lookup: {
          from: 'votes',
          localField: '_id',
          foreignField: 'questionId',
          as: 'votes',
        },
      },
      {
        $lookup: {
          from: 'offers',
          localField: '_id',
          foreignField: 'questionId',
          as: 'offers',
        },
      },
      // { $addFields: { commentsCount: { $size: '$comments' } } },
      // { $addFields: { votesCount: { $size: '$votes' } } },
      // { $addFields: { offersCount: { $size: '$offers' } } },
    ]);
    if (questions.length > 0) {
      return questions[0];
    } else {
      throw new NotFoundException('Question not found');
    }
  }

  async voteQuestion(
    voteDto: VoteQuestionDTO,
    user: UserDocument,
  ): Promise<any> {
    const updateDetails = await this.voteModel.updateOne(
      {
        userId: user._id,
        questionId: voteDto.questionId,
      },
      {
        vote: voteDto.vote === 'up' ? 1 : -1,
      },
      { upsert: true },
    );

    if (voteDto.vote === 'up') {
      await this.questionModel.updateOne(
        { _id: voteDto.questionId },
        { $inc: { 'questionValue.totalVoteCount': 1 } },
      );
    }
    if (voteDto.vote === 'down') {
      await this.questionModel.updateOne(
        { _id: voteDto.questionId },
        { $inc: { 'questionValue.totalVoteCount': -1 } },
      );
    }
    return updateDetails;
  }
}
