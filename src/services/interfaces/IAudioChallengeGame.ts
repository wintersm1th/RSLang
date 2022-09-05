export interface IAudioChallengeGame {
  startFromStartScreen(): void;
  startForDifficulty(): void;
  selectAnswerVariant(wordId: string);
}