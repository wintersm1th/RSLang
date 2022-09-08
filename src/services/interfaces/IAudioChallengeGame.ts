export type StartingParams = {
  group: number;
  page: number;
};

export interface IAudioChallengeGame {
  startWithParams(params: StartingParams): void;
  startWithSettingsScreen(): void;
  startGame(): void;
  setGroup(value: number): void;
  setPage(value: number): void;
  selectAnswerVariant(wordId: string): void;
  destroy(): void;
}
