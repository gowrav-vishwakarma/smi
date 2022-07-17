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

class QuestionValue {
  totalOfferingCount!: number;

  totalVoteCount!: number;

  totalCommentsCount!: number;
}

class SolutionChannels {
  comments!: boolean;

  chat!: boolean;

  screenShare!: boolean;

  audioCall!: boolean;

  videoCall!: boolean;
}

export default class QuestionListResponseDTO {
  _id!: string;

  topic!: string;

  title!: string;

  detail!: string;

  tags!: string[];

  video!: string;

  status!: string;

  solutionChannels!: SolutionChannels;

  questionValue!: QuestionValue;

  createdAt!: string;

  questionerId!: string;

  __v!: number;

  byUser!: ByUser;
}
