import { api } from './baseApi';
import { Word } from './shemas';

type QueryWordsArg = {
  group: string;
  page: string;
}

type ReadWordArg = {
  wordId: string;
}

export const wordsApi = api.injectEndpoints({
  endpoints: (build) => ({
    queryWords: build.query<Word[], QueryWordsArg>({
      query: ({ group, page }) => ({
        url: 'words',
        params: { group, page }
      })
    }),
    
    readWord: build.query<Word, ReadWordArg>({
      query: ({ wordId }) => ({
        url: `words/${wordId}`
      })
    })
  })
});