import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { pipe } from 'rxjs';
import { CreateQuestionDTO } from '../dto/create-question.dto';
import { GetQuestionsDTO } from '../dto/question-filter-query.dto';
import { QuestionOfferSolutionDTO } from '../dto/question-offersolution.dto';
import { VoteQuestionDTO } from '../dto/vote-question.dto';
import { Comment } from '../schemas/comment.schema';
import { Question, QuestionDocument } from '../schemas/question.schema';
import {
  SolutionOffer,
  SolutionOfferDocument,
} from '../schemas/solutionoffer.schema';
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
    @InjectModel(SolutionOffer.name)
    private readonly offerModel: Model<SolutionOfferDocument>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<Comment>,
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

    const pipeline = [];
    pipeline.push({ $match: matchCondition });
    if (user) {
      // Include my vode
      pipeline.push({
        $lookup: {
          from: 'votes',
          localField: '_id',
          foreignField: 'questionId',
          as: 'myVote',
          pipeline: [
            {
              $match: {
                userId: user._id,
              },
            },
            {
              $project: { vote: 1, _id: 0 },
            },
          ],
        },
      });

      pipeline.push({
        $set: {
          myVote: {
            $first: '$myVote',
          },
        },
      });

      // include my Offers
      pipeline.push({
        $lookup: {
          from: 'solutionoffers',
          localField: '_id',
          foreignField: 'questionId',
          as: 'myOffer',
          pipeline: [
            {
              $match: {
                userId: user._id,
              },
            },
            {
              $project: { notes: 1, _id: 0 },
            },
          ],
        },
      });

      pipeline.push({
        $set: {
          myOffer: {
            $first: '$myOffer',
          },
        },
      });
    }

    pipeline.push({
      $lookup: {
        from: 'users',
        localField: 'questionerId',
        foreignField: '_id',
        as: 'byUser',
        pipeline: [
          {
            $project: {
              name: 1,
              languagesSpeaks: 1,
              reputationAsQuestioner: 1,
            },
          },
        ],
      },
    });

    pipeline.push({ $unwind: '$byUser' });

    const questions = await this.questionModel.aggregate(pipeline);

    return questions;
  }

  async getdetailedQuestion(
    id: string,
    user?: UserDocument,
  ): Promise<QuestionDocument> {
    const pipeline = [];

    pipeline.push({ $match: { _id: ObjectId(id) } });
    if (user) {
      // Include my vode
      pipeline.push({
        $lookup: {
          from: 'votes',
          localField: '_id',
          foreignField: 'questionId',
          as: 'myVote',
          pipeline: [
            {
              $match: {
                userId: user._id,
              },
            },
            {
              $project: { vote: 1, _id: 0 },
            },
          ],
        },
      });

      pipeline.push({
        $set: {
          myVote: {
            $first: '$myVote',
          },
        },
      });

      // include my Offers
      pipeline.push({
        $lookup: {
          from: 'solutionoffers',
          localField: '_id',
          foreignField: 'questionId',
          as: 'myOffer',
          pipeline: [
            {
              $match: {
                userId: user._id,
              },
            },
            {
              $project: { notes: 1, _id: 0 },
            },
          ],
        },
      });

      pipeline.push({
        $set: {
          myOffer: {
            $first: '$myOffer',
          },
        },
      });
    }

    pipeline.push({
      $lookup: {
        from: 'users',
        localField: 'questionerId',
        foreignField: '_id',
        as: 'byUser',
        pipeline: [
          {
            $project: {
              name: 1,
              languagesSpeaks: 1,
              reputationAsQuestioner: 1,
            },
          },
        ],
      },
    });

    pipeline.push({ $unwind: '$byUser' });

    const questions = await this.questionModel.aggregate(pipeline);
    if (questions.length > 0) {
      return questions[0];
    } else {
      throw new NotFoundException('Question not found');
    }
  }

  async getQuestionOffers(questionId: string) {
    const offers = await this.offerModel.aggregate([
      { $match: { questionId: ObjectId(questionId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'offererId',
          foreignField: '_id',
          as: 'Offerer',
          pipeline: [
            {
              $project: { name: 1, ratingAsSolver: 1 },
            },
          ],
        },
      },
      { $unwind: '$Offerer' },
    ]);

    return offers;
  }

  async getQuestionComments(questionId: string, user?: UserDocument) {
    const pipeline = [];

    pipeline.push({ $match: { questionId: ObjectId(questionId) } });

    pipeline.push({
      $lookup: {
        from: 'users',
        localField: 'commenterId',
        foreignField: '_id',
        as: 'User',
        pipeline: [
          {
            $project: { name: 1, ratingAsSolver: 1, _id: 0 },
          },
        ],
      },
    });

    pipeline.push({ $unwind: '$User' });

    console.log('user found ??? ', user);
    if (user) {
      console.log('user found ====== ', user);
      // Include my vote
      pipeline.push({
        $lookup: {
          from: 'votes',
          localField: '_id',
          foreignField: 'commentId',
          as: 'myVote',
          pipeline: [
            {
              $match: {
                userId: user._id,
              },
            },
            {
              $project: { vote: 1, _id: 0 },
            },
          ],
        },
      });

      pipeline.push({
        $set: {
          myVote: {
            $first: '$myVote',
          },
        },
      });
    }

    const comments = await this.commentModel.aggregate(pipeline);

    return comments;
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

  async offerSolution(offer: QuestionOfferSolutionDTO, user: UserDocument) {
    // intert into offers collection and increment question offer count
    const offerDetails = await this.offerModel.create({
      ...offer,
      offererId: user._id,
    });
    await this.questionModel.updateOne(
      { _id: offer.questionId },
      { $inc: { 'questionValue.totalOfferingCount': 1 } },
    );

    return offerDetails;
  }
}
