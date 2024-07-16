'use client'
import React, { useState, useCallback } from 'react';
import JKAcknowledgementModal from '@/components/loginForm/JKAcknowledgementModal';
import { Box, Typography } from '@mui/material';
import TextInput from '@/components/loginForm/TextInput';
import { resetPassword } from '@/api/drupal';
import validator from 'validator';

interface ResetEmailAddressProps {
  emailAddress?: string;
  openModal: boolean;
  handleHideModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ResetEmailAddress: React.FC<ResetEmailAddressProps> = ({
  openModal,
  handleHideModal,
}) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const validateEmail = useCallback((email: string) => {
    setEmailAddress(email);
    setEmailAddressError(!validator.isEmail(email));
  }, []);

  const handleSave = async () => {
    if((!emailAddressError) && (emailAddress !== '')){
      try {
        const response = await resetPassword(emailAddress);
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
    if(emailAddress === ''){
      setEmailAddressError(true);
    }
  };

  return (
    <>
      <JKAcknowledgementModal
        openModal={openModal}
        closeModal={handleHideModal}
        buttonAction={showThankYou ? undefined : handleSave}
        buttonLabel={showThankYou ? '' : 'Reset Password'}
        modalTitle={showThankYou ? 'Request Submitted' : 'Reset Your Password'}
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
                Please check your email for further instructions.
              </Typography>
            </Box>
          ) : (
            <Box>
              <Box sx={{ paddingBottom: '16px' }}>
                <Typography variant="body2">
                  Lost your password? Please enter your email address. You will
                  receive a link to create a new password.
                </Typography>
              </Box>
              <Box>
                <TextInput
                  id="resetPassword"
                  label="Email Address"
                  value={emailAddress}
                  onChange={validateEmail}
                  required
                  error={emailAddressError}
                  errorMessage="Please enter a valid email address"
                />
              </Box>
            </Box>
          )
        }
      />
    </>
  );
};

export default ResetEmailAddress;
