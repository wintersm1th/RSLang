import React from 'react';
import { useState, useEffect } from 'react';

import { api } from '../../../model/service/api';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import WordCard from './WordCard';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import DIContainer from "../../../DI/DIContainer";
import DI_TYPES from "../../../DI/DITypes";
import IDictionaryService from "../../../services/interfaces/IDictionaryService";
import { useSelector } from "react-redux";
import { selectState } from "../../../model/feature/dictionary";

const Main = () => {

  const { difficult, pageNumber } = useSelector(selectState);

  const [page, setPage] = useState(pageNumber);
  const [group, setGroup] = useState(difficult);

  const dictionaryService = DIContainer.get<IDictionaryService>(DI_TYPES.DictionaryService);

  const setPageNumber = (pageNumber: string) => {
    dictionaryService.setPage(pageNumber);
    setPage(pageNumber);
  }

  const setDifficult = (difficult: string) => {
    dictionaryService.setDifficult(difficult);
    setGroup(difficult);
  }


  const { data: words } = api.useReadWordsQuery({ group, page: page });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [words]);

  return (
    <Container>
      <Paper component={'div'} sx={{ padding: 5 }}>
        <Typography marginBottom="30px">Page: {page}</Typography>
        <Box display="flex" gap="20px">
          <Button component={Link} to={'/games/sprint'} variant="outlined">
            Спринт
          </Button>
          <Button component={Link} to={'/games/audiocall'} variant="outlined">
            Аудиовызов
          </Button>
        </Box>
        <RadioGroup row value={group} onChange={(_e, value) => setDifficult(value)}>
          <FormControlLabel value="0" control={<Radio />} label="1" />
          <FormControlLabel value="1" control={<Radio />} label="2" />
          <FormControlLabel value="2" control={<Radio />} label="3" />
          <FormControlLabel value="3" control={<Radio />} label="4" />
          <FormControlLabel value="4" control={<Radio />} label="5" />
          <FormControlLabel value="5" control={<Radio />} label="6" />
        </RadioGroup>
        <Grid container spacing={5} marginBottom="30px">
          {words &&
            words.map((word) => (
              <Grid item xs={4} key={word.id}>
                <WordCard word={word} />
              </Grid>
            ))}
        </Grid>
        <Box display="flex" justifyContent="center">
          <Pagination count={29} page={+page} onChange={(_e, newPage) => setPageNumber(String(newPage))} />
        </Box>
      </Paper>
    </Container>
  );
};

export default Main;
