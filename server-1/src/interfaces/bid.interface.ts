import { PayPerENUM } from './question.interface';

export interface Bid {
  _id: string;
  questionId: string;
  questionById: string;
  questionBy: string;
  biderId: string;
  bider: string;
  credit: number;
  payPer: PayPerENUM;
  lastSolutionAttemptId: string;
  solutionAttemptIds: string[];
  createdAt: Date;
}
