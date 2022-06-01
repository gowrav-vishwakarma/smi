import { PayPerENUM } from './question.interface';

export interface Bid {
  _id: string;
  questionId: string;
  questionById: string;
  questionBy: string;
  bidId: string;
  bidById: string;
  bidBy: string;
  credit: number;
  payPer: PayPerENUM;
  lastSolutionAttemptId: string;
  solutionAttemptIds: string[];
  createdAt: Date;
}
