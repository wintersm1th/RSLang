import React, { useEffect } from 'react';
import { useState } from 'react';

import { useGetWordsQuery, Word } from '../../../generated/services/langApi';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const imagePath = (img: string) => `https://react-learnwords-example.herokuapp.com/${img}`;

const Word = ({ word }: { word: Word }) => (
  <Card>
    { word.image &&
      <CardMedia image={imagePath(word.image)} sx={{ height: 200 }} />
    }
    <ul>
      <li>
        Id: {word.id}
      </li>
      <li>
        Word:{word.word}
      </li>
      <li>
        Translation: {word.wordTranslate}
      </li>
    </ul>
  </Card>
);

const Main = () => {
  const [ page, setPage ] = useState(1);

  const { data: words } = useGetWordsQuery({ group: '0', page: String(page)});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [words])

  return (
    <Container>
      <Paper component={'div'} sx={{ padding: 5 }}>
        <Typography marginBottom='30px'>
          Page: {page}
        </Typography>
        <Grid
          container
          spacing={5}
          marginBottom='30px' >
          { words &&
            words.map((word) =>
              <Grid item xs={4}>
                <Word word={word}/>
              </Grid>
            )
          }
        </Grid>
        <Box display='flex' justifyContent='center'>
          <Pagination              
            count={10}
            page={page}
            onChange={(_e, newPage) => setPage(newPage)} />
        </Box>
      </Paper>
    </Container>
  );
};

export default Main;
