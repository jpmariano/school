//import * as sass from 'node-sass';
import * as sass from 'sass';
import fs from "fs";

export async function convertSCSStoCSS(scss:string) {
  
   const valCss =  await sass.compileStringAsync(scss);

    return  valCss;
} 