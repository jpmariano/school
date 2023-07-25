import { PaletteOptions } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  export interface PaletteOptions {
    customFont: {
      family: {
          primary: string;
          secondary: string;
      };
    };
  }
}