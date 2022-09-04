interface IDictionaryService {
  start: () => void;
  setPage: (pageNumber: number) => void;
  setDifficult: (difficult: number) => void;
}

export default IDictionaryService;
