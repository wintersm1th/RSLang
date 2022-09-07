import React from 'react';

import { words as wordsApi } from '../../model/api/public';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

type WordProps = {
  wordId: string;
}

const Word = ({ wordId }: WordProps) => {
  const { data: word } = wordsApi.useReadWordQuery({ wordId });

  return (
    <ListItem>
      { word &&
        <>
          <ListItemIcon>
            <PlayArrowIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography>{word.word} [{word.transcription}] - {word.wordTranslate}</Typography>            
          </ListItemText>
        </>
      }
      
    </ListItem>
  );
}

type WordsListProps = {
  title: string;
  words: string[];
}

const WordsList = ({ title, words }: WordsListProps) => {
  return (
    <Box>
      <Typography>{title}</Typography>
      <List dense >
        { words.map((wordId) =>
          <Word key={wordId} wordId={wordId} />
        )}
      </List>
    </Box>
  )
}

type GameResultsProps = {
  results: {
    correctAnswers: string[],
    incorrectAnswers: string[],
  },
}

const GameResults = ({ results }: GameResultsProps) => {  
  return (
    <Box>
      { results.correctAnswers.length && <WordsList title='Верно' words={results.correctAnswers} /> }
      { results.correctAnswers.length && <WordsList title='Неверно' words={results.incorrectAnswers} /> }        
    </Box>
  );
}

export default GameResults;