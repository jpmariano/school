'use client'
import React, { ReactNode, useEffect, useState } from 'react';
import { Box, Button, FormControl, FormHelperText, Input, InputLabel, Paper, TextField, Typography, colors, useTheme } from '@mui/material';
import Image from 'next/image';
import styles from "@/styles/components/loginform/loginform.module.scss";
import TextInput from './TextInput';
import { useRouter } from 'next/router';
import validator from 'validator';
import LogInSignupBtn from '@/components/loginForm/LogInSignupBtn';
import ResetEmailAddress from '@/components/loginForm/ResetEmailAddress';
import { useSearchParams } from 'next/navigation';
import CreateAccount from '@/components/loginForm/CreateAccount';
import Divider from '@mui/material/Divider';

export interface loginFormProps {
    //children?: ReactNode;
    component?: any;
   // addClassName?: 'inverse';
    //showBoxShadow?: boolean;
}

const LoginForm: React.FC<loginFormProps> = ({component = "section"}) => {
  const [errors, setErrors] = useState({ email: false, password: false });
  //login?error=CredentialsSignin
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [emailMessage, setEmailMessage] = useState('Invalid Email');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const theme = useTheme();
  const searchParams = useSearchParams()
 
  const error = searchParams.get('error');
  useEffect(() => { 
    if (error === 'CredentialsSignin') {
      setErrors((prevState) => ({ ...prevState, email: true, password: true }));
      setDisplayErrorMessage(true);
      setEmailMessage('');
    }
  }, [error]);


  const validateEmail = (email: string) => {
    setEmailMessage('Invalid Email');
    if (validator.isEmail(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: false,
      }));
    } else {
      if (email !== '') {
        setErrors((prevState) => ({
          ...prevState,
          email: true,
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          email: false,
        }));
      }
    }
  };

  const toggleModal = () => {
    setShowResetPassword(!showResetPassword);
  };
  const toggleCreateAccountModal = () => {
    setShowCreateAccount(!showCreateAccount);
  };

  const handleSubmit = (event: React.FormEvent) => {
    if (credentials.email === '' && credentials.password === '') {
      setErrors((prevState) => ({
        ...prevState,
        email: true,
        password: true,
      }));
    } else {
      if (!validator.isEmail(credentials.email)) {
        setErrors((prevState) => ({
          ...prevState,
          email: true,
          password: credentials.password === '' ? true : false,
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          email: false,
          password: credentials.password === '' ? true : false,
        }));
      }
    }
    /*if (
      !errors.email &&
      !errors.password &&
      credentials.email !== '' &&
      credentials.password !== ''
    ) {
      signIn('credentials', {
        username: credentials.email,
        password: credentials.password,
        redirect: true,
        callbackUrl: '/dashboard',
      });
    } */
  };
  


  return (
    <Paper component={'div'} sx={{backgroundColor: theme.palette.primary.main}} className={`${styles.logincontainer}`}>
         <Image
          src="/logo.png"
          width={150}
          height={38}
          alt="webupps logo"
        />
        <Paper component={'div'} sx={{}} className={`${styles.loginform}`}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            name="login"
            id="login"
            sx={{ textAlign: 'left' }}
            >
              <Box sx={{ flexDirection: 'column' }}>
              {displayErrorMessage && (
                  <Box className="mb-2">
                    <Box
                    
                      sx={{
                        backgroundColor: 'rgba(183, 18, 52, .3)',
                        borderRadius: '4px',
                      }}
                    >
                      
                      <Box sx={{p: '20px'}}> Incorrect email or password. Please, try again or 
                        <Box component='span'
                          onClick={toggleModal}
                          sx={{
                            color: "blue",
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            px: 1,
                            fontFamily: "Barlow"
                          }}
                        >
                          click here
                        </Box>
                      to reset your password. </Box>
                      
                    </Box>
                  </Box>
              )}
                <Box className="mb-1">
                  <Box component={"input"} type="email" id="email" value={credentials.email} className={`border rounded border-gray-400 border-solid w-full h-12 p-5 ${errors.email && 'border-1 border-rose-500'}`} placeholder="Email" required
                    onChange={(input) => {
                      setDisplayErrorMessage(false);
                      setCredentials((prevState) => ({
                        ...prevState,
                        email: input.target.value,
                      }));
                      validateEmail(input.target.value);
                    }}
                  />
                  <Box
                      component="div"
                      sx={{
                        display: 'flex',
                        visibility: errors.email ? 'visible' : 'hidden',
                        minHeight: '8px',
                      }}
                    >
                      <Typography variant="body2" sx={{ color: "red" }}>
                        {emailMessage}
                      </Typography>
                    </Box>
                </Box>
                <Box className="mb-5">
                  <input type="password" id="password" className={`border rounded border-gray-400 border-solid w-full h-12 p-5 ${errors.password && 'border-1 border-rose-500'}`}  placeholder="Password" required 
                    onChange={(input) => {
                      setDisplayErrorMessage(false);
                      setCredentials((prevState) => ({
                        ...prevState,
                        password: input.target.value,
                      }));
                      if (input.target.value !== '') {
                        setErrors((prevState) => ({
                          ...prevState,
                          password: false,
                        }));
                      }
                    }}
                    value={credentials.password}
                  />
                </Box>
              </Box>
              <LogInSignupBtn text="log In" onClick={handleSubmit} />
          </Box>
          <Divider sx={{margin: "20px 0", opacity: 0.8}} orientation="horizontal" flexItem />
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: '' }}
            className={styles.continueBtnContainer}
          >
            <Button
              variant="contained"
              onClick={toggleCreateAccountModal}
              className={styles.createaccountbtn}
            >
              Create Account
            </Button>
          </Box>
          <ResetEmailAddress
                openModal={showResetPassword}
                handleHideModal={toggleModal}
              />
          <CreateAccount openModal={showCreateAccount}
                handleHideModal={toggleCreateAccountModal} />
         </Paper>
         
    </Paper> 
    );
};

export default LoginForm;