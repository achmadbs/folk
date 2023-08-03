import { Box, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const [isLoginForm, setIsLoginForm] = useState(true);

  useEffect(() => {
    if (token !== 'undefined' && token !== undefined) {
      navigate('/product', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Stack justifyContent='center' alignItems='center' height='100%'>
      <Box
        borderRadius={2}
        minWidth='31rem'
        p={4}
        boxShadow='-1px 2px 7px 2px rgba(0,0,0,0.43)'
      >
        <LoginForm {...{ isLoginForm, setIsLoginForm }} />
        <RegisterForm {...{ isLoginForm, setIsLoginForm }} />
      </Box>
    </Stack>
  );
};

export default LoginPage;
