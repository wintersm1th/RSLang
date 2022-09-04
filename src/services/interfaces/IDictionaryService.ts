interface IDictionaryService {
  start: () => void;
  setPage: (pageNumber: string) => void;
  setDifficult: (difficult: string) => void;
}

export default IDictionaryService;
