export interface IAudioChallengeGame {
  start(): void;
  destroy(): void;
  startGame(): void;
  selectGroup(value: number): void;
  selectPage(value: number): void;
  selectAnswerVariant(wordId: string): void;
}
