
'use client'
import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { EditorState, EditorStateConfig, Extension, StateField } from '@codemirror/state';
import { CodePlayerContext } from '@/components/codemirror/codePlayer';
import { sass } from '@codemirror/lang-sass';
import { less } from '@codemirror/lang-less';
import { php } from '@codemirror/lang-php';
import { json } from '@codemirror/lang-json';
import { sql } from '@codemirror/lang-sql';
import { yaml } from '@codemirror/lang-yaml';



export interface codeReadOnlyProps {
    children?: string;
    language: 'javascript' | 'css' | 'html' | 'sass' | 'less' | 'jsx' | 'typescript'| 'php' | 'json' | 'sql' | 'yaml';
}

const CodeReadOnly: React.FC<codeReadOnlyProps> = ({language = 'javascript', children }) => {
    
    const [code, setCode] = useState('');
    const [extensions, setExtensions] = useState<Extension[]>([]);
    const codeInitialize = children?.toString();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        children && setCode(codeInitialize ? codeInitialize : '');
         //setIsLoaded(true);
         switch(language) { 
             case 'javascript': { 
                setExtensions([javascript({ jsx: true })]);
                break; 
             } 
             case 'jsx': {
                setExtensions([javascript({ jsx: true })]);
                break;
             }
             case 'typescript': {
                setExtensions([javascript({ typescript: true })]);
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
             case 'sass': {
                setExtensions([sass()]);        
                break;
             }
             case 'less': {
                setExtensions([less()]);            
                break;
             }
             case 'php': {
               setExtensions([php()]);            
               break;
             }
             case 'json': {
               setExtensions([json()]);            
               break;
             }
             case 'sql': {
               setExtensions([sql()]);            
               break;
             }
             case 'yaml': {
               setExtensions([yaml()]);            
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
    <Box component="section" id='test' sx={{overflow: 'hidden', height: '100%', minHeight: '100px',  width: '100%' }} className='lg:min-w-[500px] sm:w-full'>
         <CodeMirror
      value={code}
      minHeight='100px'
      maxHeight='500px'
      minWidth={isMobile ? '100%' : '500px'}
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
