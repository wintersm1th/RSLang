export type UserWordParameters = {
  isDifficult: boolean;
  isLearned: boolean;
};

interface IWordsService {
  setWordHardMark(userId: string, wordId: string): Promise<boolean>;
  removeWordDifficultMark(userId: string, wordId: string): Promise<boolean>;

  setWordLearnedMark(userId: string, wordId: string): Promise<boolean>;
  removeWordLearnedMark(userId: string, wordId: string): Promise<boolean>;
}

export default IWordsService;
