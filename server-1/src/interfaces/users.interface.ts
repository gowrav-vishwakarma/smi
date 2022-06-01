export enum OnlineStatusENUM {
  ONLINE = 'online',
  OFFLINE = 'offline',
  AWAY = 'away',
  BUSY = 'busy',
}
export interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  languagesSpeaks: string[];
  onlineStatus: OnlineStatusENUM;
  solvedQuestionCount: number;
  totalRatingPoints: number;
  totalSolutionsAttempted: number;
  totalRatingsCount: number;
  totalQuestionerRatingCount: number;
  questionerRatingPoints: number;
  orgId: string;
  agencyId: string;
  credits: {
    self: number;
    organisation: number;
    agency: number;
  };
}
