import SolutionChannelsDTO from "../solution-channels.dto";

class Votes {
  _id!: string;

  questionId!: string;

  userId!: string;

  vote!: number;
}

class QuestionValue {
  totalOfferingCount!: number;

  totalVoteCount!: number;

  totalCommentsCount!: number;
}

class ByUser {
  languagesSpeaks!: string[];
  name!: string;
  reputationAsQuestioner!: any;
  // {
  //   totalQuestionsAsked: 0;
  //   totalMarkedSolved: 0;
  //   totalRatingsCount: 0;
  //   totalRatingsSum: 0;
  // };
  _id!: string;
}
export default class QuestionDetailResponseDTO {
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

  comments!: undefined[];

  votes!: Votes[];

  offers!: undefined[];

  byUser!: ByUser;
}
