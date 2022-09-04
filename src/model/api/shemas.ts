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
}

export type UserWordPayload = {}

export type UserWord = {
  difficulty: string;
  optional?: UserWordPayload;
}

export type StatisticPayload = {}

export type Statistic = {
  learnedWord: number;
  optional?: Partial<StatisticPayload>;
}

export type SettingPayload = {}

export type Setting = {
  wordsPerDay: number;
  optional?: Partial<SettingPayload>;
}

export type User = {
  name: string;
  email: string;
  password: string;
}

export type Auth = {
  name: string;
  userId: string;
  message: string;
  token: string;
  refreshToken: string;
}
