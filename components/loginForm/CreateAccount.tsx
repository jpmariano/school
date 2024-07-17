'use client'
import React, { useState, useCallback, useEffect } from 'react';
import JKAcknowledgementModal from '@/components/loginForm/JKAcknowledgementModal';
import { Box, Grid, Typography } from '@mui/material';
import TextInput from '@/components/loginForm/TextInput';
import { resetPassword, userSignup } from '@/api/drupal';
import validator from 'validator';
import LogInSignupBtn from '@/components/loginForm/LogInSignupBtn';

interface CreateAccountProps {
  emailAddress?: string;
  openModal: boolean;
  handleHideModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CreateAccount: React.FC<CreateAccountProps> = ({
  openModal,
  handleHideModal,
}) => {
  const [errors, setErrors] = useState({ email: false, password: false });
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [emailMessage, setEmailMessage] = useState('Invalid Email');
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

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
  //rest/create-account
  const handleSave = async (event: React.FormEvent) => {
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
    if (
      !errors.email &&
      !errors.password &&
      credentials.email !== '' &&
      credentials.password !== ''
    ) {
      try {
        const response = await userSignup(credentials);
        if (response.status === 200) {
          setShowThankYou(true);
        } else {
          setShowThankYou(false);
          console.log('error');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }

      
    } 
  };

  useEffect(() => { 
    if (!openModal) {
      setErrors((prevState) => ({ ...prevState, email: false, password: false }));
      setCredentials((prevState) => ({
        ...prevState,
        email: '',
        password: ''
      }));
      setShowThankYou(false);
    }
  }, [openModal]);

  return (
    <>
      <JKAcknowledgementModal
        openModal={openModal}
        closeModal={handleHideModal}
        modalTitle={showThankYou ? 'Sign Up Submitted' : 'Create Account'}
        modalContent={
          showThankYou ? (
            <Box
              sx={{
                width: '100%',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <Typography variant="body1">
                Please check your email for verification.
              </Typography>
            </Box>
          ) : (
            <Box
            component="form"
            onSubmit={handleSave}
            name="signup"
            id="signup"
            sx={{ textAlign: 'left' }}
            >
              <Box sx={{ flexDirection: 'column' }}>
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
                  <input type="password" id="password" className={`border rounded  border-solid w-full h-12 p-5 ${errors.password ? 'border-1 border-rose-500' : 'border-gray-400'}`}  placeholder="Password" required 
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
              <LogInSignupBtn text="Sign Up" onClick={handleSave} />
          </Box>
          )
        }
      />
    </>
  );
};

export default CreateAccount;
