import {
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Box,
  Button,
  Divider,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { LoginProps, Response } from './types';
import axios from 'utils/axiosInstance';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ isLoginForm, setIsLoginForm }: LoginProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleChangeForm(e: ChangeEvent<HTMLInputElement>) {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin() {
    try {
      setIsLoading(true);
      const res: Response = await axios.post('login', {
        email: loginForm.email,
        password: loginForm.password,
      });
      Cookies.set('token', res.data.data.token, {
        sameSite: 'strict',
        expires: 1,
      });
      Cookies.set(
        'users',
        JSON.stringify({ email: res.data.data.email, name: res.data.data.name })
      );
      navigate('/product', { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isLoginForm) return null;
  return (
    <>
      <Typography
        variant='h3'
        fontFamily='Gotham'
        fontWeight='bold'
        color='secondary'
      >
        Masuk
      </Typography>
      <Stack spacing={2.5} mt={4} mb={3}>
        <TextField
          placeholder='Email'
          name='email'
          value={loginForm.email}
          sx={{ boxShadow: 2, borderRadius: 1 }}
          onChange={handleChangeForm}
        />
        <TextField
          placeholder='Password'
          name='password'
          value={loginForm.password}
          sx={{ boxShadow: 2, borderRadius: 1 }}
          type={isShowPassword ? 'text' : 'password'}
          onChange={handleChangeForm}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position='end'
                sx={{ cursor: 'pointer' }}
                onClick={() => setIsShowPassword((prevState) => !prevState)}
              >
                <Typography
                  variant='caption'
                  fontFamily='Gotham'
                  color='secondary'
                >
                  {isShowPassword ? 'Hide' : 'Show'}
                </Typography>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ placeSelf: 'end' }}>
          <Button>
            <Typography
              variant='caption'
              fontFamily='Gotham'
              color='secondary'
              fontSize='10px'
            >
              Lupa Password?
            </Typography>
          </Button>
        </Box>
      </Stack>
      <Stack spacing={3} alignItems='center'>
        <Button
          variant='contained'
          color='info'
          size='large'
          sx={{ width: '100%', borderRadius: 1 }}
          disabled={isLoading}
          onClick={handleLogin}
        >
          Masuk
        </Button>
        <Divider sx={{ width: '90%' }} />
        <Stack direction='row' alignItems='center'>
          <Typography variant='subtitle1' fontFamily='Gotham' color='#7C7C7C'>
            Belum punya akun?
          </Typography>
          <Button color='info' onClick={() => setIsLoginForm(false)}>
            <Typography
              variant='button'
              fontFamily='Gotham'
              color='secondary'
              fontWeight='bold'
            >
              Daftar Sekarang
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default LoginForm;
