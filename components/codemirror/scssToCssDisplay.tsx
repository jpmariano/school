
'use client'
import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { EditorState, EditorStateConfig, Extension, StateField } from '@codemirror/state';
import { CodePlayerContext } from '@/components/codemirror/codePlayer';
import useWindowDimensions from '@/utils/useWindowDimensions';
//import SassConverter from '@/api/sassconverter';
import * as less from 'less';
//import scss from '@hai2007/algorithm/scss.js';
//import * as sass from 'sass';


export interface scssToCssDisplayProps {
  children?: string;
  language?: 'javascript' | 'css' | 'html' | 'sass' | 'less';
}

const ScssToCssDisplay: React.FC<scssToCssDisplayProps> = ({language, children}) => {
  const { upDateHtml, updateJavascript, updateCss, updateSass,  initialized,  htmlCode, cssCode, javascriptCode, headCode, sassCode, lessCode} = useContext(CodePlayerContext);
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
          case 'sass': { 
            initialized && sassCode && less.render(sassCode).then(function (output: any) {
              setCode(output.css);
            },
              function (error: any) {
                console.log(error)
                setCode(sassCode);
              });
            break;
          } 
          case 'less': { 
            initialized && lessCode && less.render(lessCode).then(function (output: any) {
              console.log(output)
              setCode(output.css);
            },
              function (error: any) {
                console.log(error)
                setCode(lessCode);
              });
             break; 
          } 
          default: { 
             //statements; 
             break; 
          } 
       }
        
        
        //console.log(lessplugin)
       /*less.render(sassCode, { plugins: [] })
   .then(function(output: any) {
    console.log(output)
   },
   function(error: any) {
    console.log(error)
   });*/
       // sassCode && SassConverter(sassCode).then((value) => (console.log(value)))
        //console.log(sass.compileString(''))
        //const result = sass.compileString(sassCode ? sassCode : '');
        //const result = sass.compileString(input);
        //console.log(result.css)
        setExtensions([css()]);
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

export default ScssToCssDisplay;
