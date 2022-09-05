export interface IAudioChallengeGame {
  start(): void;
  destroy(): void;
  selectGroup(value: number): void;
  selectPage(value: number): void;
  selectAnswerVariant(wordId: string): void;
}
