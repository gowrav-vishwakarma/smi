export enum PayPerENUM {
  HOUR = 'hour',
  SOLUTION = 'solution',
}

export enum QuestionStatusENUM {
  UNSOLVED = 'unsolved',
  SOLVED = 'solved',
}

export interface Question {
  _id: string;
  topic: string;
  title: string;
  description: string;
  tags: string[];

  payment: {
    credits: number;
    payPer: PayPerENUM;
  };

  isPaid: boolean;
  status: QuestionStatusENUM;
  isFeatured: boolean;
  canShareScreen: boolean;
  canDoVideoCall: boolean;

  createdById: string;
  createdAt: Date;
  by: string;

  totalBids: number;
  languagesSpeaks: string[];
  recording: string;
  isActive: boolean;
  solutionId: string;
}
