export type UserWordParameters = {
  isDifficult: boolean;
  isFavorite: boolean;
}

interface IWordsService {
  addWord(wordId: string, params: UserWordParameters): Promise<boolean>;
}

export default IWordsService;