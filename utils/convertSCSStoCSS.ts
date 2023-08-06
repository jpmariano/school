//import * as sass from 'node-sass';
import * as sass from 'sass';
import fs from "fs";

export async function convertSCSStoCSS(scss:string) {
   // const valCss =  await sass.compileStringAsync("",  "async");
   //const valCss =  await sass.compileStringAsync(scss);
   //console.log(valCss)
   /*const output = sass.renderSync({
    data: scss,
    indentedSyntax: true,
    outputStyle : 'compressed'
  });
  console.log(output)*/
    return  "test";
    /*
    let promise =  await new Promise((resolve, reject) => {

        return async function() {
            const valCss =  await sass.compileStringAsync(scss);
            x
          };

       
        async () => {
            const valCss =  await sass.compileStringAsync(scss);
            if (valCss.css) {
                resolve(valCss.css);
              } else {
                reject(scss);
              } 
        } 

        //const result =  sass.compileStringAsync(scss);
        
        //renderSync
        
        const output = sass.renderSync({
            data: scss,
            indentedSyntax: true,
            outputStyle : 'compressed'
          });
          if (output) {
            resolve(output.css.toString());
          } else {
            reject(scss);
          } 
          if (true) {
            resolve(scss);
          } else {
            reject("error");
          } 
      });*/
  
   // return promise;
  } 