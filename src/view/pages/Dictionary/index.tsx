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

const Main = () => {
  const [page, setPage] = useState('1');
  const [group, setGroup] = useState('0');

  const { data: words } = api.useReadWordsQuery({ group, page: page });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [words]);

  return (
    <Container>
      <Paper component={'div'} sx={{ padding: 5 }}>
        <Typography marginBottom="30px">Page: {page}</Typography>
        <RadioGroup row value={group} onChange={(_e, value) => setGroup(value)}>
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
          <Pagination count={29} page={+page} onChange={(_e, newPage) => setPage(String(newPage))} />
        </Box>
      </Paper>
    </Container>
  );
};

export default Main;
