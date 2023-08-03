
'use client'
import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { EditorState, EditorStateConfig, Extension, StateField } from '@codemirror/state';
import { CodePlayerContext } from '@/components/codemirror/codePlayer';
import useWindowDimensions from '@/utils/useWindowDimensions';

//import scss from '@hai2007/algorithm/scss.js';
import * as sass from 'sass';

export interface scssToCssDisplayProps {
  children?: string;
}

const ScssToCssDisplay: React.FC<scssToCssDisplayProps> = ({children}) => {
  const { upDateHtml, updateJavascript, updateCss, updateSass,  initialized,  htmlCode, cssCode, javascriptCode, headCode, sassCode} = useContext(CodePlayerContext);
    //const {  sassCode} = useContext(CodePlayerContext);


    const [code, setCode] = useState('');
    const codeInitialize = children?.toString();
    const [extensions, setExtensions] = useState<Extension[]>([]);
    const { height, width } = useWindowDimensions();
    const containerHeight = height/1.67;
    const codeMirrorHeight = height/1.67 - 35;
    
    useEffect(() => {
        if(!initialized){
          children && setCode(codeInitialize ? codeInitialize : '');
        }
        initialized && sassCode && setCode(sassCode); 
  
        console.log(sass.compileString(''))
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
