import { transform } from '@babel/standalone';

export async function convertJsxStringToJs(jsxString:string) {
  
    try {
        const result = transform(jsxString, {
            presets: ['react'],
        });
        return result?.code || null;
      } catch (error) {
        console.error('Error during JSX to JS conversion:', error);
        return null;
      }
 
     
 } 