class asFollowers {
  totalFollowers = 0;
  userFollowersIds: string[] = [];
}

class asFollowing {
  totalFollowing = 0;
  userFollowingIds: string[] = [];
}

class asSocialProfile {
  LinkedIn: string | null = null;
  Facebook: string | null = null;
  Instagram: string | null = null;
  Pinterest: string | null = null;
  Quora: string | null = null;
  Stackoverflow: string | null = null;
  Website: URL | null = null;
}

class asReputationAsQuestioner {
  totalQuestionsAsked = 0;
  totalMarkedSolved = 0;
  totalRatingsCount = 0;
  totalRatingsSum = 0;
}

class asRatingAsSolver {
  totalOfferingCount = 0;
  totalRatingCount = 0;
  totalRatingSum = 0;
  totalCommentsCount = 0;
  totalCommentsVoteCount = 0;
  totalAcceptedCount = 0;
}

export default class userProfile {
  status!: string;
  asFollowers!: asFollowers;
  asFollowing!: asFollowing;
  skills: string[] = [];
  socialProfile!: asSocialProfile;
  name!: string;
  city!: string;
  state!: string;
  post!: string;
  jobType!: string;
  email!: string | null;
  languagesSpeaks!: string[];
  country!: string;
  onlineStatus!: string;
  accountType!: string;
  topicsInterestedIn!: string[];
  reputationAsQuestioner!: asReputationAsQuestioner;
  ratingAsSolver!: asRatingAsSolver;
  username!: string;
  experiences!: any[];
}
