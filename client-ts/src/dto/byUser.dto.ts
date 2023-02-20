class ReputationAsQuestioner {
  totalQuestionsAsked!: number;

  totalMarkedSolved!: number;

  totalRatingsCount!: number;

  totalRatingsSum!: number;
}

class ReputationAsSolver {
  totalOfferingCount!: number;
  totalRatingCount!: number;
  totalRatingSum!: number;
  totalCommentsCount!: number;
  totalCommentsVoteCount!: number;
  totalAcceptedCount!: number;
}
export default class ByUser {
  _id!: string;

  name!: string;

  languagesSpeaks!: string[];

  reputationAsQuestioner!: ReputationAsQuestioner;

  ratingAsSolver!: ReputationAsSolver;
}
