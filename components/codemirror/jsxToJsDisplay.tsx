
'use client'
import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { EditorState, EditorStateConfig, Extension, StateField } from '@codemirror/state';
import { CodePlayerContext } from '@/components/codemirror/codePlayer';
import useWindowDimensions from '@/utils/useWindowDimensions';
import { convertJsxStringToJs } from '@/utils/convertJsxStringToJs';
import { javascript } from '@codemirror/lang-javascript';
//import scss from '@hai2007/algorithm/scss.js';
//import * as sass from 'sass';


export interface jsxToJsDisplayProps {
  children?: string;
  language?: 'javascript' | 'css' | 'html' | 'sass' | 'less' | 'jsx' | 'typescript';
}

const JsxToJsDisplay: React.FC<jsxToJsDisplayProps> = ({language, children}) => {
  const { upDateHtml, updateJavascript, updateCss, updateSass, updateJsx, updateTypescript, initialized,  htmlCode, cssCode, javascriptCode, jsxCode, typescriptCode, headCode, sassCode, lessCode} = useContext(CodePlayerContext);
    //const {  sassCode} = useContext(CodePlayerContext);


    const [code, setCode] = useState('');
    const codeInitialize = children?.toString();
    const [extensions, setExtensions] = useState<Extension[]>([]);
    const { height, width } = useWindowDimensions();
    const containerHeight = height/1.67;
    const codeMirrorHeight = height/1.67 - 35;

    //const cleanCSSPlugin = new lessplugin({advanced: true});
    
    useEffect(() => {
        if(!initialized){
          children && setCode(codeInitialize ? codeInitialize : '');
        }
        switch(language) { 
          case 'jsx': { 
            initialized && jsxCode && convertJsxStringToJs(jsxCode).then(function (output: any) {
              setCode(output);
            },
            function (error: any) {
              setCode(jsxCode);
            });
            break;
          } 
          case 'typescript': {
            initialized && typescriptCode && convertJsxStringToJs(typescriptCode).then(function (output: any) {
              setCode(output);
            },
            function (error: any) {
              setCode(typescriptCode);
            });
            break;
          }
          default: { 
             //statements; 
             break; 
          } 
       }
        
   
        setExtensions([javascript()]);
        // eslint-disable-next-line
       }, []);


       


      

  return (
    <Box component="section" sx={{overflow: 'hidden', height: `${containerHeight}px`}}>
        
         <CodeMirror
      value={code}
      height={`${codeMirrorHeight}px`}
      width='100%'
      extensions={extensions}
      theme='dark'
      editable={false}
    />
    </Box> 
    );
};

export default JsxToJsDisplay;
