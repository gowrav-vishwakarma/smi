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
  type: 'Indivisual' | 'Organisation' | 'Agency';
  languagesSpeaks: string[];
  onlineStatus: OnlineStatusENUM;

  solvedQuestionCount: number;
  totalSolutionsAttempted: number;

  totalRatingPoints: number;
  totalRatingsCount: number;

  questionerRatingPoints: number;
  totalQuestionerRatingCount: number;

  orgId: string;
  agencyId: string;

  credits: {
    self: number;
    organisation: number;
    agency: number;
  };
}
