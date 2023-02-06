import ByUser from "../byUser.dto";
import SolutionChannelsDTO from "../solution-channels.dto";

export class QuestionValue {
  totalOfferingCount!: number;
  totalVoteCount!: number;
  totalVoteDownCount!: number;
  totalCommentsCount!: number;
}

export default class QuestionListResponseDTO {
  _id!: string;

  topic!: string;

  title!: string;

  detail!: string;

  tags!: string[];

  video!: string;

  status!: string;

  solutionChannels!: SolutionChannelsDTO;

  questionValue!: QuestionValue;

  myVote?: number;

  createdAt!: string;

  questionerId!: string;

  __v!: number;

  byUser!: ByUser;
}
