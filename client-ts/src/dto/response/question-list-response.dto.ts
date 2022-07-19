import SolutionChannelsDTO from "../solution-channels.dto";

class ReputationAsQuestioner {
  totalQuestionsAsked!: number;

  totalMarkedSolved!: number;

  totalRatingsCount!: number;

  totalRatingsSum!: number;
}

class ByUser {
  _id!: string;

  name!: string;

  languagesSpeaks!: string[];

  reputationAsQuestioner!: ReputationAsQuestioner;
}

export class QuestionValue {
  totalOfferingCount!: number;

  totalVoteCount!: number;

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

  createdAt!: string;

  questionerId!: string;

  __v!: number;

  byUser!: ByUser;
}
