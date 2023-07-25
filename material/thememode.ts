'use client'

import { createTheme, ThemeOptions } from '@mui/material';
import {light, dark} from '@/material/themesettings';
import { Palette, Theme } from '@mui/material';

interface IPalette extends Palette {
  family: {       
    primary: string;
    secondary: string;
  }
}

interface ITheme extends Theme {
  palette: IPalette;
}

export interface IThemeOptions extends ThemeOptions {
  customFont: {
    family: {
        primary: 'Barlow';
        secondary: '"Roboto","Helvetica","Arial",sans-serif';
    };
  };
}



const darkTheme = createTheme(dark as IThemeOptions);
const lightTheme = createTheme(light as IThemeOptions);

  /*
  https://mui.com/material-ui/customization/default-theme/*/
  //https://bobbyhadz.com/blog/react-export-multiple-functions
export {darkTheme, lightTheme};