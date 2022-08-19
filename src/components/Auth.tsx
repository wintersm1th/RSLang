import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Auth = () => {

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="login" label="Логин" variant="outlined" />
            <TextField id="password" label="Пароль" variant="outlined" />
            <Button variant="outlined">Авторизоваться</Button>
        </Box>
    );
}

export default Auth;
