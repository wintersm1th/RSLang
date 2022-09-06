export type StartingParams = {
  group: number;
  page: number;
}

export interface IAudioChallengeGame {
  startWithParams(params: StartingParams): void;
  startWithSettingsScreen(): void;
  startGame(): void;
  selectGroup(value: number): void;
  selectPage(value: number): void;
  selectAnswerVariant(wordId: string): void;
  destroy(): void;
}
