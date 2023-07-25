import { ThemeOptions } from '@mui/material';

//https://mui.com/material-ui/customization/default-theme/
export const light: ThemeOptions = {
  breakpoints: {
    values: {xs: 0, sm: 335, md: 744, lg: 936, xl: 1200}
  },
  palette: {
    mode: 'light',
    customFont: {
      family: {
        primary: 'Barlow',
        secondary: '"Roboto", "Helvetica", "Arial", "sans-serif"',
      },
    },
    primary: {
      main: '#005293',
    },
    background: {
      paper: '#ffffff',
      default: '#ffffff'
    },
  },
  typography: {
    h1: {
      color: '#1E1E1E',
      fontFamily: '"Barlow", "sans-serif"',
      fontSize: '60px',
      fontWeight: 'Normal',
      lineHeight: '120%',
      letterSpacing: '-0.5px',
      fontStyle: 'inherit',
      '@media (max-width: 900px)': {
        fontFamily: '"Barlow-Bold", "sans-serif"',
        fontSize: '30px',
        fontWeight: 'bold',
        lineHeight: '123.5%',
        letterSpacing: '-0.25px',
        fontStyle: 'inherit',
      }
    },
    h2: {
      color: '#1E1E1E',
      fontFamily: '"Barlow-Bold", "sans-serif"',
      fontSize: '3rem',
      fontWeight: '400',
      lineHeight: '3.8rem',
      fontStyle: 'inherit',
      '@media (max-width: 600px)': {
        color: '#1E1E1E',
        fontSize: '24px',
        fontWeight: '700',
        lineHeight: '32px',
        fontStyle: 'inherit',
      },
    },
    h3: {
      color: '#1E1E1E',
      fontFamily: '"Barlow-Bold", "sans-serif"',
      fontSize: '2rem',
      fontWeight: '500',
      lineHeight: '3.2rem',
      fontStyle: 'inherit',
      '@media (max-width: 600px)': {
        color: '#1E1E1E',
        fontSize: '20px',
        fontWeight: '700',
        lineHeight: '32px',
        letterSpacing: '0.15px',
        fontStyle: 'inherit',
      },
    },
    h4: {
      color: '#1E1E1E',
      fontFamily: '"Barlow-Bold", "sans-serif"',
      fontSize: '1.375rem',
      fontWeight: '600',
      lineHeight: '2.2rem',
      fontStyle: 'inherit',
    },
    body1: {
      color: '#1E1E1E',
      fontFamily: '"Barlow-Bold", "sans-serif"',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '150%',
      fontStyle: 'inherit',
    },
    body2: {
      color: '#1E1E1E',
      fontFamily: '"Barlow", "sans-serif"',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '143%',
      fontStyle: 'inherit',
    },
    subtitle1: {
      color: '#1E1E1E',
      fontFamily: '"Barlow", "sans-serif"',
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '157%',
      fontStyle: 'inherit',
    },
    overline: {
      color: '#1E1E1E',
      fontFamily: '"Barlow", "sans-serif"',
      fontSize: '12px',
      fontWeight: '500',
      lineHeight: '266%',
      fontStyle: 'inherit',
    },
    button: {
      color: '#1E1E1E',
      fontFamily: '"Barlow", "sans-serif"',
      fontSize: '16px',
      fontWeight: '600',
      lineHeight: '175%',
      letterSpacing: '0.5px',
      fontStyle: 'inherit',
    },
  },
  components: {
    // Name of the component
    MuiInputBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          // add variant styles like so
          '&.Mui-disabled': {
            backgroundColor: '#cccccc',
          },
        },
      },
    },
  },
};

export const dark: ThemeOptions = {
  breakpoints: {
    values: {xs: 0, sm: 335, md: 744, lg: 936, xl: 936}
  },
  palette: {
    mode: 'dark',
    info: {
      main: '#0288D1',
      dark: '#0288D1',
    },
    primary: {
      main: '#005293',
    },
    background: {
      paper: '#ffffff',
      default: '#ffffff'
    },
    customFont: {
      family: {
        primary: 'Barlow',
        secondary: '"Roboto", "Helvetica", "Arial", "sans-serif"',
      },
    },
  },
  typography: {
    h1: {
      color: '#FFFFFF',
      fontFamily: '"Barlow", "sans-serif"',
      fontSize: '60px',
      fontWeight: 'Medium',
      lineHeight: '120%',
      letterSpacing: '-0.5 px',
      fontStyle: 'inherit',
      paddingTop: '50px',
      paddingBottom: '50px',
      '@media (max-width: 600px)': {
        fontSize: '34px',
        fontWeight: '700',
        lineHeight: '42px',
        fontStyle: 'inherit',
      },
    },
    h2: {
      color: '#FFFFFF',
      fontFamily: '"Barlow-Bold", "sans-serif"',
      fontSize: '3rem',
      fontWeight: '400',
      lineHeight: '3.8rem',
      fontStyle: 'inherit',
      '@media (max-width: 600px)': {
        color: '#FFFFFF',
        fontSize: '24px',
        fontWeight: '700',
        lineHeight: '32px',
        fontStyle: 'inherit',
      },
    },
    h3: {
      color: '#FFFFFF',
      fontFamily: '"Barlow-Bold", "sans-serif"',
      fontSize: '2rem',
      fontWeight: '500',
      lineHeight: '3.2rem',
      fontStyle: 'inherit',
      '@media (max-width: 600px)': {
        color: '#FFFFFF',
        fontSize: '20px',
        fontWeight: '700',
        lineHeight: '32px',
        letterSpacing: '0.15px',
        fontStyle: 'inherit',
      },
    },
    h4: {
      color: '#FFFFFF',
      fontFamily: '"Barlow-Bold", "sans-serif"',
      fontSize: '1.375rem',
      fontWeight: '600',
      lineHeight: '2.2rem',
      fontStyle: 'inherit',
    },
    body1: {
      color: '#FFFFFF',
      fontFamily: '"Barlow-Bold", "sans-serif"',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '150%',
      fontStyle: 'inherit',
    },
    body2: {
      color: '#FFFFFF',
      fontFamily: '"Barlow", "sans-serif"',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '143%',
      fontStyle: 'inherit',
    },
    subtitle1: {
      color: '#FFFFFF',
      fontFamily: '"Barlow", "sans-serif"',
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '157%',
      fontStyle: 'inherit',
    },
    overline: {
      color: '#FFFFFF',
      fontFamily: '"Barlow", "sans-serif"',
      fontSize: '12px',
      fontWeight: '500',
      lineHeight: '266%',
      fontStyle: 'inherit',
    },
    button: {
      color: '#FFFFFF',
      fontFamily: '"Barlow", "sans-serif"',
      fontSize: '16px',
      fontWeight: '600',
      lineHeight: '175%',
      letterSpacing: '0.5px',
      fontStyle: 'inherit',
    },
  },
  components: {
    // Name of the component
    MuiInputBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: '#3F3F3F',
          // add variant styles like so
          '&.Mui-disabled': {
            backgroundColor: '#cccccc',
          },
        },
      },
    },
  },
};
