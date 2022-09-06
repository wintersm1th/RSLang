import React from 'react';

// import Typography from "@mui/material/Typography";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { StartScreenStage } from '../../../model/feature/audiochallenge';
import DIContainer from '../../../DI/DIContainer';
import DI_TYPES from '../../../DI/DITypes';
import { IAudioChallengeGame } from '../../../services/interfaces/IAudioChallengeGame';

const pageIndicies = Array(30)
  .fill(0)
  .map((_, ind) => ind);

type StartScreenProps = {
  screenState: StartScreenStage;
};

const StartScreen = ({ screenState }: StartScreenProps) => {
  const gameService: IAudioChallengeGame = DIContainer.get(DI_TYPES.AudioChallengeGame);

  return (
    <>
      <InputLabel id="audio-challenge-start-group">Сложность</InputLabel>
      <Select
        labelId="audio-challenge-start-group"
        value={screenState.group}
        onChange={(e) => gameService.selectGroup(+e.target.value)}
      >
        <MenuItem value={0}>1</MenuItem>
        <MenuItem value={1}>2</MenuItem>
        <MenuItem value={2}>3</MenuItem>
        <MenuItem value={3}>4</MenuItem>
        <MenuItem value={4}>5</MenuItem>
        <MenuItem value={5}>6</MenuItem>
      </Select>

      <InputLabel id="audio-challenge-start-page">Страница</InputLabel>
      <Select
        labelId="audio-challenge-start-page"
        value={screenState.page}
        onChange={(e) => gameService.selectPage(+e.target.value)}
      >
        {pageIndicies.map((page) => (
          <MenuItem key={page} value={page}>{` ${page + 1} `}</MenuItem>
        ))}
      </Select>

      <Button variant={'contained'} onClick={() => gameService.startGame()}>Start</Button>
    </>
  );
};

export default StartScreen;
