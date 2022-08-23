import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../model/feature/user';
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
  const { userId } = useSelector(selectUserInfo);
  const { data: userWords } = api.useGetUserWordsQuery({ id: userId });

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
  const { userId } = useSelector(selectUserInfo);

  const [wordId, setWordId] = useState('');
  const [payloadValue, setPayloadValue] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [addWord] = api.usePostUserWordsMutation();

  const handleCreateWordButtonClick = () => {
    addWord({
      difficulty,
      wordId,
      payload: {
        value: payloadValue
      },
      id: userId
    })
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
  const { token, userId } = useSelector(selectUserInfo);
  return (
    <Container>

      <h1>Hello Main!</h1>
      <Typography>{`Token : ${token}`}</Typography>
      <Typography>{`UserId: ${userId}`}</Typography>
      <AddUserWordComponent/>
      <UserWordsTable/>
      <Box>
        <Outlet />
      </Box>
    </Container>
  );
};

export default Main;
