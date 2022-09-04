import { injectable } from 'inversify';

import store from '../model/store';
import IDictionaryService from './interfaces/IDictionaryService';
import { LOCAL_STORAGE_DICTIONARY_DIFFICULT_KEY, LOCAL_STORAGE_DICTIONARY_PAGENUMBER_KEY } from '../core/constants';
import { setDifficult, setPage } from '../model/feature/dictionary';

@injectable()
export default class DictionaryService implements IDictionaryService {
  start(): void {
    const difficult = localStorage.getItem(LOCAL_STORAGE_DICTIONARY_DIFFICULT_KEY) ?? '1';
    const pageNumber = localStorage.getItem(LOCAL_STORAGE_DICTIONARY_PAGENUMBER_KEY) ?? '0';
    store.dispatch(setPage(pageNumber));
    store.dispatch(setDifficult(difficult));
  }

  setPage(pageNumber: string): void {
    localStorage.setItem(LOCAL_STORAGE_DICTIONARY_PAGENUMBER_KEY, pageNumber);
    store.dispatch(setPage(pageNumber));
  }

  setDifficult(difficult: string): void {
    localStorage.setItem(LOCAL_STORAGE_DICTIONARY_DIFFICULT_KEY, difficult);
    store.dispatch(setPage(difficult));
  }
}
