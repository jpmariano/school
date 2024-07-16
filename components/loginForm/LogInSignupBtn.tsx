import React from 'react';
import styles from '@/styles/components/loginform/loginsignupbtn.module.scss';
import { Box, Button } from '@mui/material';

interface LogInSignupBtnProps {
  text: string;
  onClick?: (event: React.FormEvent) => void;
}

const LogInSignupBtn: React.FC<LogInSignupBtnProps> = ({ text, onClick }) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: '' }}
      className={styles.continueBtnContainer}
    >
      <Button
        variant="contained"
        onClick={onClick}
        className={styles.continueBtn}
      >
        {text}
      </Button>
    </Box>
  );
};

export default LogInSignupBtn;
