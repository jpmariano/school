import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface DashboardAlertProps {
    title?: string;
    alertMessage?: string;
    severity?: 'info' | 'error' | 'warning' | 'success';

}



export  const DashboardAlert: React.FC<DashboardAlertProps> = ({title, alertMessage, severity = 'info' }) => {
  const theme = useTheme();

  let isLight: boolean = true;
    if (theme.palette.mode === 'dark') {
        isLight = false;
    }
  return (

    <Container maxWidth='xl' >
      {isLight ?
        <Alert severity={severity} sx={{ color: "#0288D1" }}>
          <AlertTitle>
            {title}
          </AlertTitle>
          <Typography>{alertMessage}</Typography>
        </Alert> : <Alert severity={severity} >
          <AlertTitle>
            {title}
          </AlertTitle>
          <Typography>{alertMessage}</Typography>
        </Alert>}

    </Container>
  );
}