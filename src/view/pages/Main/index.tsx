import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { selectState as selectAuth } from '../../../model/feature/userAuthParams';
import { api } from '../../../model/service/api';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';

import Stack from '@mui/material/Stack';

const UserWordsTable = () => {
  const { user } = useSelector(selectAuth);
  const { data: userWords } = user ? api.useGetUserWordsQuery({ id: user.id }) : { data: undefined };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>WordId</TableCell>
            <TableCell>Difficulty</TableCell>
            <TableCell>Payload</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { userWords &&
            userWords.map((word) =>
              <TableRow key={word.id}>
                <TableCell>{word.id}</TableCell>
                <TableCell>{word.difficulty}</TableCell>
                <TableCell>{word.optional.value}</TableCell>
              </TableRow>
            )
          }
        </TableBody>  
      </Table>
    </TableContainer>
  )
}

const AddUserWordComponent = () => {
  const { user } = useSelector(selectAuth);

  const [wordId, setWordId] = useState('');
  const [payloadValue, setPayloadValue] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [addWord] = api.usePostUserWordsMutation();

  const handleCreateWordButtonClick = () => {
    if (user !== null) {
      addWord({
        difficulty,
        wordId,
        payload: {
          value: payloadValue
        },
        id: user.id
      })
    }
  }
  return (
    <Stack direction={'row'}>
      <TextField label="WordID" value={wordId} onChange={(e) => setWordId(e.target.value)}/>
      <TextField label="Difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}/>
      <TextField label="Payload" value={payloadValue} onChange={(e) => setPayloadValue(e.target.value)}/>
      <Button onClick={handleCreateWordButtonClick}>asd</Button>
    </Stack>
  )
}

const Main = () => {
  const { user } = useSelector(selectAuth);
  return (
    <Container>

      <h1>Hello Main!</h1>
      { user &&
        <>
          <Typography>{`Token : ${user.token}`}</Typography>
          <Typography>{`UserId: ${user.id}`}</Typography>
          <AddUserWordComponent/>
          <UserWordsTable/>
        </>
      }
      <Box>
        <Outlet />
      </Box>
    </Container>
  );
};

export default Main;
