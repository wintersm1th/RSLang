export type UserWordParameters = {
  isDifficult: boolean;
  isLearned: boolean;
}

interface IWordsService {
  setWordDifficultMark(wordId: string): Promise<boolean>;
  removeWordDifficultMark(wordId: string): Promise<boolean>;

  setWordLearnedMark(wordId: string): Promise<boolean>;
  removeWordLearnedMark(wordId: string): Promise<boolean>;
}

export default IWordsService;