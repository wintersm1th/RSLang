const DI_TYPES = {
  App: Symbol.for('App'),
  RegistrationService: Symbol.for('Register'),
  WordsService: Symbol.for('WordsService'),
  AuthService: Symbol.for('Auth'),
  DictionaryService: Symbol.for('DictionaryService'),
  StatisticsService: Symbol.for('StatisticsService')
};

export default DI_TYPES;
