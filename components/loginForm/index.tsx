'use client'
import React, { ReactNode, useEffect, useState } from 'react';
import { Alert, AlertColor, Box, Button, FormControl, FormHelperText, Input, InputLabel, LinearProgress, Paper, TextField, Typography, colors, useTheme } from '@mui/material';
import Image from 'next/image';
import styles from "@/styles/components/loginform/loginform.module.scss";
import TextInput from './TextInput';
import { useRouter } from 'next/navigation';
import validator from 'validator';
import LogInSignupBtn from '@/components/loginForm/LogInSignupBtn';
import ResetEmailAddress from '@/components/loginForm/ResetEmailAddress';
import { useSearchParams } from 'next/navigation';
import CreateAccount from '@/components/loginForm/CreateAccount';
import Divider from '@mui/material/Divider';
import { alertType } from '@/types';
import { getSession, signIn } from 'next-auth/react';


export interface loginFormProps {
    //children?: ReactNode;
    component?: any;
   // addClassName?: 'inverse';
    //showBoxShadow?: boolean;
}

const LoginForm: React.FC<loginFormProps> = ({component = "section"}) => {
  const router = useRouter();
  console.log(router);
  //const router = useRouter();
  //const { errorfromAuth } = router.query;
  //console.log(errorfromAuth);
  const [errors, setErrors] = useState({ username: false, password: false });
  //login?error=CredentialsSignin
  //login?status=200&message=Password+Reset+Successful%21
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [emailMessage, setEmailMessage] = useState('Invalid Email');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [alertStatus, setAlertStatus] = useState<alertType | undefined>({severity: "success", message: ""});
  const [loading, setLoading] = useState(false);  // New loading state


  const theme = useTheme();
  const searchParams = useSearchParams()
  const error = searchParams.get('error');
  const responseStatus = searchParams.get('status');
  const statusMessage = searchParams.get('message');
  const statusMessageString = statusMessage ? statusMessage : '';
  useEffect(() => { 
    
    const statusCode = responseStatus !== null ? parseInt(responseStatus) : 0;
    
  

    if (statusCode >= 200 && statusCode < 300) {
  
      setAlertStatus((prevState) => ({
        ...prevState,
        severity: "success",
        message: statusMessageString
      }));
    } else if (statusCode >= 400 && statusCode < 500) {
      //setMessage('Client Error: There was an error with your request.');

      setAlertStatus((prevState) => ({
        ...prevState,
        severity: "warning",
        message: statusMessageString
      }));
    } else if (statusCode >= 500) {
    //setMessage('Server Error: There was a problem with the server.');
      setAlertStatus((prevState) => ({
        ...prevState,
        severity: "error",
        message: statusMessageString
      }));
    }
  }, [responseStatus]);

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
        username: false,
      }));
    } else {
      if (email !== '') {
        setErrors((prevState) => ({
          ...prevState,
          username: true,
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          username: false,
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the form from reloading the page
    
    if (credentials.username === '' && credentials.password === '') {
      setErrors((prevState) => ({
        ...prevState,
        username: true,
        password: true,
      }));
      return;
    }
  
    if (!validator.isEmail(credentials.username)) {
      setErrors((prevState) => ({
        ...prevState,
        username: true,
        password: credentials.password === '' ? true : false,
      }));
      return;
    }
    setLoading(true);  // Set loading to true when the sign-in process starts
    // Proceed with login if no errors
    const result = await signIn('credentials', {
      username: credentials.username,
      password: credentials.password,
      redirect: false, // Prevent default redirect for manual handling
    });
  
    // Handle the result of the signIn function
    if (result?.ok) {
      // Get the current session after the login
      const session = await getSession();
  
      if (session?.user?.userId) {
        // Dynamically redirect to the user's page with their ID
        router.push(`/user/${session?.user?.userId}`);
      } else {
        // Fallback or handle an error if the user ID is not available
        router.push(`/`);
      }
    } else {
      // Handle sign-in failure
      setDisplayErrorMessage(true);
      setErrors((prevState) => ({
        ...prevState,
        username: true,
        password: true,
      }));
    }
    setLoading(false);  // Set loading to false after the sign-in process completes
  };
  


  return (
    <Paper component={'div'} sx={{backgroundColor: theme.palette.primary.main}} className={`${styles.logincontainer}`}>
        {loading && <LinearProgress />}
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
              {
                responseStatus && statusMessage && alertStatus?.severity === "success" ? (
                  <Box
                      component="div"
                      sx={{
                        display: 'flex',
                        visibility: 'visible',
                        minHeight: '8px',
                        margin: "10px 0"
                      }}
                      
                    >
                      <Alert severity={alertStatus?.severity} className="w-full">{alertStatus?.message}</Alert>
                    </Box>
                ) : 
                responseStatus && statusMessage &&
                (
                  <Box className="mb-2">
                    <Box
                    
                      sx={{
                        backgroundColor: 'rgba(183, 18, 52, .3)',
                        borderRadius: '4px',
                      }}
                    >
                      
                      <Box sx={{p: '20px'}}> {alertStatus?.message}
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
                )
              }
                <Box className="mb-1">
                  <Box component={"input"} type="email" id="email" value={credentials.username} className={`border rounded border-gray-400 border-solid w-full h-12 p-5 ${errors.username && 'border-1 border-rose-500'}`} placeholder="Email" required
                    onChange={(input) => {
                      setDisplayErrorMessage(false);
                      setCredentials((prevState) => ({
                        ...prevState,
                        username: input.target.value,
                      }));
                      validateEmail(input.target.value);
                    }}
                  />
                  <Box
                      component="div"
                      sx={{
                        display: 'flex',
                        visibility: errors.username ? 'visible' : 'hidden',
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