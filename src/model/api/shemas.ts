export type Word = {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
};

export type UserWordPayload = {
  value: number;
};

export type UserWord = {
  difficulty: string;
  optional?: Partial<UserWordPayload>;
};

export type StatisticPayload = {
  daysWords: {
    [key: string]: {
      learnedWordsCount: number,
      newWordsCount: number,
      sprintGame: {
        learnedWordsCount: number;
        newWordsCount: number;
      },
      audioGame: {
        learnedWordsCount: number;
        newWordsCount: number;
      },
    }
  },
  sprintGame: {
    learnedWordsCount: number;
    newWordsCount: number;
    bestSession: number;
  },
  audioGame: {
    learnedWordsCount: number;
    newWordsCount: number;
    bestSession: number;
  },
};

export type Statistic = {
  optional: StatisticPayload;
};

export type SettingPayload = {
  value: number;
};

export type Setting = {
  wordsPerDay: number;
  optional?: Partial<SettingPayload>;
};

export type User = {
  name: string;
  email: string;
  password: string;
};

export type Auth = {
  name: string;
  userId: string;
  message: string;
  token: string;
  refreshToken: string;
};
