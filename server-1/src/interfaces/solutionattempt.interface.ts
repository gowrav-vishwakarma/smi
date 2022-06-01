export enum SolutionStatusENUM {
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export interface SolutionAttempt {
  _id: string;
  questionId: string;
  questionById: string;
  questionBy: string;
  bidId: string;
  bidById: string;
  bidBy: string;
  status: SolutionStatusENUM;
  bidderRating: number;
  questionerRating: number;
  attemptedAt: Date;
}
