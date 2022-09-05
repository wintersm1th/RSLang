import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type WordId = string;

enum GameStageVariant {
  StartScreen = 'start_screen',
  Running = 'running',
  Finished = 'finished'
}

interface Step  {  
  answer: WordId;
  variants: WordId[];
}

interface CompletedStep extends Step {
  result: boolean;
}

type StartScreenStage = {
  code: GameStageVariant.StartScreen;
  difficulty: number;
  page: number;
}

type RunningStage = {
  code: GameStageVariant.Running;
  currentStep: number;
  steps: (Step | CompletedStep)[];
}

type FinishedStage = {
  code: GameStageVariant.Finished;
  steps: CompletedStep[];
}

type AudioChallengeState = {
  stage: null | StartScreenStage | RunningStage | FinishedStage;
}

const initialState: AudioChallengeState = {
  stage: null,
}

export const isGameInStartScreenStage =
  (state: AudioChallengeState): state is { stage: StartScreenStage } =>
    state.stage?.code === GameStageVariant.StartScreen;

export const isGameInRunningStage =
  (state: AudioChallengeState): state is { stage: RunningStage } =>
    state.stage?.code === GameStageVariant.Running;

export const isGameInFinishedStage =
  (state: AudioChallengeState): state is { stage: FinishedStage } =>
    state.stage?.code === GameStageVariant.Finished;

type InitialScreenParams = {
  page: number;
  difficulty: number;
}

export const slice = createSlice({
  name: 'audiochallenge',
  initialState,
  reducers: {
    startFromStartScreen(state, { payload: { page, difficulty } }: PayloadAction<InitialScreenParams>) {
      if (state.stage !== null) {
        throw Error('Invalid dispatch');
      }

      const startStage: StartScreenStage = {
        code: GameStageVariant.StartScreen,
        page,
        difficulty
      }

      state.stage = startStage;
    },

    setDifficulty(state, { payload }: PayloadAction<number>) {
      if (!isGameInStartScreenStage(state)) {
        throw Error('Invalid dispatch');
      }
      
      state.stage.difficulty = payload;
    },

    setPage(state, { payload }: PayloadAction<number>) {
      if (!isGameInStartScreenStage(state)) {
        throw Error('Invalid dispatch');
      }
      
      state.stage.page = payload;
    },

    startGame(state, { payload }: PayloadAction<Step[]>) {
      if (!isGameInStartScreenStage(state)) {
        throw Error('Invalid dispatch');
      }

      const stage: RunningStage = {
        code: GameStageVariant.Running,
        currentStep: 0,
        steps: payload
      };

      return { stage }
    },

    selectWord(state, { payload: variant }: PayloadAction<WordId>) {
      if (!isGameInRunningStage(state)) {
        throw Error('Invalid dispatch');
      }

      const { currentStep, steps } = state.stage;
      const { variants, answer } = steps[currentStep];

      if (!variants.includes(variant)) {
        throw Error('Invalid variant');
      }

      const isSuccess = variant === answer;

      const completedStep: CompletedStep = {
        answer,
        variants,
        result: isSuccess
      }
      
      state.stage.steps[currentStep] = completedStep;

      state.stage.currentStep++;

      if (state.stage.currentStep === state.stage.steps.length) {
        const finishedStage: FinishedStage = {
          code: GameStageVariant.Finished,
          steps: state.stage.steps as CompletedStep[]
        }

        return {
          stage: finishedStage
        }
      }
    },
    
    destroyGame(state) {
      state.stage = null;
    }
  }
});

export const {
  startFromStartScreen,
  setDifficulty,
  setPage,
  selectWord,
  startGame,
  destroyGame,
} = slice.actions;

export const selectState = (state: RootState): AudioChallengeState => state[slice.name];
