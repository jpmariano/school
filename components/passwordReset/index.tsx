'use client'
import { Box, Card, FormControl, Grid, Paper, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import TextInput from '@/components/loginForm/TextInput';
import validator from 'validator';
import LogInSignupBtn from '@/components/loginForm/LogInSignupBtn';
import { useRouter, useSearchParams } from 'next/navigation';
import { passwordReset } from '@/api/drupal/index';
import validatePassword, { validateEmail } from '@/utils/emailPasswordValidator';
import styles from '@/styles/components/password-reset/password-reset.module.scss';
import {alertType} from '@/types';

const PasswordResetForm: React.FC = () => {
  const [errors, setErrors] = useState({
    password: false,
    confirmpassword: false,
  });
  //password-reset?name=johnpaulpmariano@gmail.com&temp_pass=asdfasdfsfe22
  const [credentials, setCredentials] = useState({ name: '', temp_pass: '', new_pass: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayPasswordPolicy, setDisplayPasswordPolicy] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('Invalid Password');
  const theme = useTheme();
  const router = useRouter();
  const query = useSearchParams();
  const name = query.get('name');
  const temp_pass = query.get('temp_pass');
    useEffect(() => {

        name && temp_pass && setCredentials((prevState) => ({
            ...prevState,
            name: name as string,
            temp_pass: temp_pass as string,
          }));
        
     // eslint-disable-next-line
    }, [name]);

  const handleSumbit = async (event: React.FormEvent) => {

    if (
      credentials.new_pass === '' &&
      confirmPassword === ''
    ) {
      setConfirmPasswordErrorMessage('Invalid Password');
      setErrors((prevState) => ({
        ...prevState,
        password: true,
        confirmpassword: true,
      }));
    } else {
        setErrors((prevState) => ({
            ...prevState,
            password: credentials.new_pass === '' ? true : displayPasswordPolicy,
        }));
    }
    console.log(credentials);
    if (
      !errors.password &&
      !errors.confirmpassword &&
      credentials.name !== '' &&
      credentials.new_pass !== '' &&
      credentials.temp_pass !== '' &&
      confirmPassword !== ''
    ) {
        

      try {
        const status = (await passwordReset(credentials)).status;
        if (status) {
          if (status === 200) {
            // Define the query parameters
            const queryParams = { status: status.toString(), message: 'Success: Try logging in.' };
            // Construct the URL with query parameters
            const queryString = new URLSearchParams(queryParams).toString();
            const targetUrl = `/login?${queryString}`;
            // Use the router to redirect
            router.push(targetUrl);
          } else {
  
            // Define the query parameters
            const queryParams = { status: status.toString(), message: 'Password Reset Failed! Try again, Create an Account or' };
            // Construct the URL with query parameters
            const queryString = new URLSearchParams(queryParams).toString();
            const targetUrl = `/login?${queryString}`;
            // Use the router to redirect
            router.push(targetUrl);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (name === null || temp_pass === null) {
    router.push('/login');
  }

  return (
    <Paper component={'div'} sx={{backgroundColor: theme.palette.primary.main}} className={`${styles.resetcontainer}`}>
        <Box
      component="form"
      onSubmit={handleSumbit}
      name="passwordreset"
      id="passwordreset"
      sx={{ textAlign: 'left' }}
      className={`${styles.resetform}`}
    >
      <FormControl sx={{ width: 1 }}>
        <Grid
          container
          spacing={2}
          className={displayPasswordPolicy ? '' : 'd-none'}
        >
          <Grid item xs={12}>
            <Card
              component="div"
              id="passwordpolicy"
              sx={{
                backgroundColor: 'rgba(183, 18, 52, .3)',
                marginBottom: '40px',
              }}
            >
              <Typography
                sx={{ textAlign: 'center', fontFamily: 'Barlow' }}
                variant="h6"
                component="div"
              >
                Password Policy
              </Typography>
              <Box component="ul" className={styles.requirementslist}>
                <Box component="li" >Password Length: Minimum of eight (8) characters</Box>
                <Box component="li" >
                  Passwords are not a derivative of the user ID or user name
                </Box>
                <Box component="li" >
                  Passwords have at least one (1) lower alpha, one (1) upper
                  alpha, one (1) number, and one (1) special character.
                </Box>
                <Box component="li" >
                  Passwords cannot contain two identical, consecutive
                  characters.
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextInput
              id="password"
              label="PASSWORD"
              onChange={(value) => {
                setCredentials((prevState) => ({
                  ...prevState,
                  new_pass: value,
                }));
                if (value !== '') {
                  if (validatePassword(credentials.name, value)) {
                    setErrors((prevState) => ({
                      ...prevState,
                      password: false,
                    }));
                    setDisplayPasswordPolicy(false);
                  } else {
                    setErrors((prevState) => ({
                      ...prevState,
                      password: true,
                    }));
                    setDisplayPasswordPolicy(true);
                  }
                  if (confirmPassword !== '') {
                    if (value !== confirmPassword) {
                      setConfirmPasswordErrorMessage("Passwords Don't Match");
                      setErrors((prevState) => ({
                        ...prevState,
                        confirmpassword: true,
                      }));
                    } else {
                      setErrors((prevState) => ({
                        ...prevState,
                        confirmpassword: false,
                      }));
                    }
                  }
                } else {
                  setErrors((prevState) => ({
                    ...prevState,
                    password: false,
                  }));
                  if (confirmPassword !== '') {
                    if (value !== confirmPassword) {
                      setConfirmPasswordErrorMessage("Passwords Don't Match");
                      setErrors((prevState) => ({
                        ...prevState,
                        confirmpassword: true,
                      }));
                    } else {
                      setErrors((prevState) => ({
                        ...prevState,
                        confirmpassword: false,
                      }));
                    }
                  }
                }
              }}
              required={true}
              value={credentials.new_pass}
              error={errors.password}
              placeholder="New Password"
              type="password"
              errorMessage={'Invalid Password'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              id="confirmpassword"
              label="CONFIRM PASSWORD"
              onChange={(value) => {
                setConfirmPassword(value);
                if (value !== '') {
                  setErrors((prevState) => ({
                    ...prevState,
                    confirmpassword: false,
                  }));
                  if (value !== credentials.new_pass) {
                    setConfirmPasswordErrorMessage("Passwords Don't Match");
                    setErrors((prevState) => ({
                      ...prevState,
                      confirmpassword: true,
                    }));
                  }
                } else {
                  setErrors((prevState) => ({
                    ...prevState,
                    confirmpassword: false,
                  }));
                }
              }}
              placeholder="Confirm Password"
              required={true}
              value={confirmPassword}
              error={errors.confirmpassword}
              type="password"
              errorMessage={confirmPasswordErrorMessage}
            />
          </Grid>
        </Grid>
      </FormControl>
      <LogInSignupBtn text="Password Reset" onClick={handleSumbit} />
    </Box>
    </Paper>
  );
};

export default PasswordResetForm;
