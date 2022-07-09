import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDTO } from '../dto/create-question.dto';
import { GetQuestionsDTO } from '../dto/question-filter-query.dto';
import { Question, QuestionDocument } from '../schemas/question.schema';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
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

  async getdetailedQuestion(id: string): Promise<QuestionDocument> {
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
}
