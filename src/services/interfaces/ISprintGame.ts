export type StartingParams = {
  group: number;
  page: number;
}

export interface ISprintGame {
  startWithParams(params: StartingParams): void;
  startWithSettingsScreen(): void;
  
  startGame(): void;

  makeOpinionYes(): void;
  makeOpinionNo(): void;

  selectGroup(value: number): void;
  selectPage(value: number): void;

  haltByTimeout(): void;

  destroy(): void;
}
