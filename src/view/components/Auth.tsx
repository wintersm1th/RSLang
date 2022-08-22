import * as React from 'react';
import { Alert, Box, TextField } from "@mui/material";
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import DIContainer from "../../DI/DIContainer";
import DI_TYPES from "../../DI/DITypes";
import { useSelector } from "react-redux";
import { RootState } from "../../model/store";
import errorResponseSlice from "../../model/feature/auth";
import IAuthService from "../../services/interfaces/IAuthService";

const registerSchema = object({
  email: string().email('Неверно указан Email'),
  password: string()
    .min(8, 'Минимальная длина пароля 8 символов')
    .max(32, 'Максимальная длина пароля 32 символа'),
});

type AuthInput = TypeOf<typeof registerSchema>;

const AuthPage = () => {
  const [loading] = useState(false);

  const authService = DIContainer.get<IAuthService>(DI_TYPES.AuthService);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<AuthInput>({
    resolver: zodResolver(registerSchema),
  });

  const Auth = useSelector((state: RootState) => state[errorResponseSlice.name]);

  const onSubmitHandler: SubmitHandler<AuthInput> = async (values) => {
    const result = await authService.authorize(values);
    if (result) {
      reset();
    }
  };

  return (
      <Box sx={{ maxWidth: "30rem" }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          {Auth.isAuthSuccess ?
            <Alert sx={{ mb: 2 }} severity="success">Вы успешно авторизовались</Alert> : ""}

          {Auth.authErrorMessage ?
            <Alert sx={{ mb: 2 }} severity="error">Ошибка: {Auth.authErrorMessage}</Alert> : ""}

          <TextField
            sx={{ mb: 2 }}
            label="Email"
            fullWidth
            required
            type="email"
            error={!!errors["email"]}
            helperText={errors["email"] ? errors["email"].message : ""}
            {...register("email")} />
          <TextField
            sx={{ mb: 2 }}
            label="Пароль"
            fullWidth
            required
            type="password"
            error={!!errors["password"]}
            helperText={errors["password"] ? errors["password"].message : ""}
            {...register("password")} />

          <LoadingButton
            variant="contained"
            fullWidth
            type="submit"
            loading={loading}
            sx={{ py: "0.8rem", mt: "1rem" }}
          >
            Авторизоваться
          </LoadingButton>

        </Box>
      </Box>
  );
};

export default AuthPage;
