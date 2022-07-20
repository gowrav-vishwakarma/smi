class ReputationAsQuestioner {
  totalQuestionsAsked!: number;

  totalMarkedSolved!: number;

  totalRatingsCount!: number;

  totalRatingsSum!: number;
}

export default class ByUser {
  _id!: string;

  name!: string;

  languagesSpeaks!: string[];

  reputationAsQuestioner!: ReputationAsQuestioner;
}
