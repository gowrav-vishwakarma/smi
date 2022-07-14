import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { VoteCommentDTO } from '../dto/vote-comment.dto';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { UserDocument } from '../schemas/user.schema';
import { Vote, VoteDocument } from '../schemas/vote.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Vote.name)
    private readonly voteModel: Model<VoteDocument>,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDTO,
    user: UserDocument,
  ): Promise<CommentDocument> {
    const commentData = {
      ...createCommentDto,
      commenterId: user._id,
    };
    return await this.commentModel.create(commentData);
  }

  getComments(questionId: string) {
    return 'TODO';
  }

  async voteCommentQuestion(
    voteDto: VoteCommentDTO,
    user: UserDocument,
  ): Promise<any> {
    const updateDetails = await this.voteModel.updateOne(
      {
        userId: user._id,
        commentId: voteDto.commentId,
      },
      {
        vote: voteDto.vote === 'up' ? 1 : -1,
      },
      { upsert: true },
    );

    if (voteDto.vote === 'up') {
      await this.commentModel.updateOne(
        { _id: voteDto.commentId },
        { $inc: { 'commentValue.totalVoteCount': 1 } },
      );
    }
    if (voteDto.vote === 'down') {
      await this.commentModel.updateOne(
        { _id: voteDto.commentId },
        { $inc: { 'commentValue.totalVoteCount': -1 } },
      );
    }
    return updateDetails;
  }
}
