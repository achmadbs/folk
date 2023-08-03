import { ChangeEvent, useState } from 'react';
import { LoginProps } from './types';
import {
  Typography,
  Stack,
  TextField,
  Button,
  Divider,
  InputAdornment,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'utils/axiosInstance';

const RegisterForm = ({ isLoginForm, setIsLoginForm }: LoginProps) => {
  const [registerStep, setRegisterStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfPassword, setIsShowConfPassword] = useState(false);

  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const { firstName, lastName, email, password, confirmPassword, phone } =
    registerForm;

  function handleChangeForm(e: ChangeEvent<HTMLInputElement>) {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  }

  function handleResetForm() {
    setRegisterForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    });
  }

  async function handleRegister() {
    const payload = {
      name: firstName + lastName,
      email,
      password,
      phone,
    };
    try {
      setIsLoading(true);
      await axios.post('register', payload);
      handleResetForm();
      setIsLoginForm(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function gotoLoginForm() {
    setIsLoginForm(true);
    handleResetForm();
  }

  const renderFirstStep = () => {
    return (
      !isLoginForm &&
      registerStep === 0 && (
        <>
          <Typography
            variant='h3'
            fontFamily='Gotham'
            fontWeight='bold'
            color='secondary'
          >
            Daftar Sekarang
          </Typography>
          <Stack spacing={2.5} mt={4} mb={3}>
            <TextField
              name='firstName'
              placeholder='Nama Depan'
              value={firstName}
              sx={{ boxShadow: 2, borderRadius: 1 }}
              onChange={handleChangeForm}
            />
            <TextField
              name='lastName'
              placeholder='Nama Belakang'
              value={lastName}
              sx={{ boxShadow: 2, borderRadius: 1 }}
              onChange={handleChangeForm}
            />
            <TextField
              name='email'
              placeholder='Email'
              value={email}
              type='email'
              sx={{ boxShadow: 2, borderRadius: 1 }}
              onChange={handleChangeForm}
            />
          </Stack>
          <Stack spacing={3} alignItems='center'>
            <Button
              variant='contained'
              color='info'
              size='large'
              sx={{ width: '100%', borderRadius: 1 }}
              onClick={() => setRegisterStep(1)}
            >
              Selanjutnya
            </Button>
            <Divider sx={{ width: '90%' }} />
            <Stack direction='row' alignItems='center'>
              <Typography
                variant='subtitle1'
                fontFamily='Gotham'
                color='#7C7C7C'
              >
                Sudah punya akun?
              </Typography>
              <Button color='info' onClick={gotoLoginForm}>
                <Typography
                  variant='button'
                  fontFamily='Gotham'
                  color='secondary'
                  fontWeight='bold'
                >
                  Masuk
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </>
      )
    );
  };

  const renderLastStep = () => {
    return (
      !isLoginForm &&
      registerStep === 1 && (
        <>
          <Button
            size='small'
            startIcon={<ArrowBackIcon color='secondary' />}
            onClick={() => setRegisterStep(0)}
          >
            <Typography
              variant='h6'
              fontFamily='Gotham'
              fontWeight='bold'
              color='secondary'
            >
              Kembali
            </Typography>
          </Button>

          <Stack spacing={2.5} mt={4} mb={3}>
            <TextField
              name='phone'
              placeholder='Nomor Telepon'
              value={phone}
              sx={{ boxShadow: 2, borderRadius: 1 }}
              onChange={handleChangeForm}
            />
            <TextField
              name='password'
              placeholder='Password'
              value={password}
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
            <TextField
              name='confirmPassword'
              placeholder='Konfirmasi Password'
              value={confirmPassword}
              sx={{ boxShadow: 2, borderRadius: 1 }}
              type={isShowConfPassword ? 'text' : 'password'}
              onChange={handleChangeForm}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position='end'
                    sx={{ cursor: 'pointer' }}
                    onClick={() =>
                      setIsShowConfPassword((prevState) => !prevState)
                    }
                  >
                    <Typography
                      variant='caption'
                      fontFamily='Gotham'
                      color='secondary'
                    >
                      {isShowConfPassword ? 'Hide' : 'Show'}
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack spacing={3} alignItems='center'>
            <Button
              variant='contained'
              color='info'
              size='large'
              sx={{ width: '100%', borderRadius: 1 }}
              disabled={isLoading}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Divider sx={{ width: '90%' }} />
            <Stack direction='row' alignItems='center'>
              <Typography
                variant='subtitle1'
                fontFamily='Gotham'
                color='#7C7C7C'
              >
                Sudah punya akun?
              </Typography>
              <Button color='info' onClick={gotoLoginForm}>
                <Typography
                  variant='button'
                  fontFamily='Gotham'
                  color='secondary'
                  fontWeight='bold'
                >
                  Masuk
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </>
      )
    );
  };

  if (isLoginForm) return null;

  return (
    <>
      {renderFirstStep()}
      {renderLastStep()}
    </>
  );
};

export default RegisterForm;
