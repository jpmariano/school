
'use client'
import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { EditorState, EditorStateConfig, Extension, StateField } from '@codemirror/state';
import { CodePlayerContext } from '@/components/codemirror/codePlayer';



export interface codeReadOnlyProps {
    children?: string;
    language?: 'javascript' | 'css' | 'html';
}

const CodeReadOnly: React.FC<codeReadOnlyProps> = ({language = 'javascript', children }) => {
    
    const [code, setCode] = useState('');
    const [extensions, setExtensions] = useState<Extension[]>([]);
    const codeInitialize = children?.toString();
    

    useEffect(() => {
        children && setCode(codeInitialize ? codeInitialize : '');
         //setIsLoaded(true);
         switch(language) { 
             case 'javascript': { 
                setExtensions([javascript({ jsx: true })]);
                break; 
             } 
             case 'html': { 
                 setExtensions([html({ matchClosingTags: true })]);
                break; 
             } 
             case 'css': { 
                 setExtensions([css()]);
                break; 
             }
             default: { 
                 setExtensions([javascript({ jsx: true })]);
                break; 
             } 
          }
          // eslint-disable-next-line
       }, []);
//#1aa8ff
  return (
    <Box component="section" id='test' sx={{overflow: 'hidden', height: '100%', minHeight: '100px',  width: '100%' , minWidth: '500px'}}>
         <CodeMirror
      value={code}
      minHeight='100px'
      maxHeight='500px'
      minWidth='500px'
      height="100%"
      width='100%'
      extensions={extensions}
      theme='dark'
      editable={false}
    />
    </Box> 
    );
};

export default CodeReadOnly;
