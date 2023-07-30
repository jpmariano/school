
'use client'
import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { EditorState, EditorStateConfig, Extension, StateField } from '@codemirror/state';
import { CodePlayerContext } from '@/components/codemirror/codePlayer';

export interface codeEditorProps {
    children?: string;
    language?: 'javascript' | 'css' | 'html';
}

const CodeEditor: React.FC<codeEditorProps> = ({language = 'javascript', children = ''}) => {

    const { upDateHtml, updateJavascript, updateCss} = useContext(CodePlayerContext);

    
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
       }, []);

    const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
        //console.log('value:', value);
        switch(language) { 
            case 'javascript': { 
                updateJavascript && updateJavascript(value)
               break; 
            } 
            case 'html': { 
                upDateHtml && upDateHtml(value)
               break; 
            } 
            case 'css': { 
                updateCss && updateCss(value)
               break; 
            }
            default: { 
                updateJavascript && updateJavascript(value)
               break; 
            } 
         }
      }, [language, upDateHtml, updateCss, updateJavascript]);

       


      

  return (
    <Box component="section" >
         <CodeMirror
      value={code}
      height="200px"
      width='100%'
      extensions={extensions}
      onChange={onChange}
      theme='dark'
    />
    </Box> 
    );
};

export default CodeEditor;
