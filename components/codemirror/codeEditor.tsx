
'use client'
import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { sass } from '@codemirror/lang-sass';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { less } from '@codemirror/lang-less';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { EditorState, EditorStateConfig, Extension, StateField } from '@codemirror/state';
import { CodePlayerContext } from '@/components/codemirror/codePlayer';
import AnswerBtn from '@/components/iconbtns/answerBtn';
import StackRightBtn from '@/components/layouts/stackRightBtn';
import { Height } from '@mui/icons-material';
import useWindowDimensions from '@/utils/useWindowDimensions';

export interface codeEditorProps {
    children?: string;
    language?: 'javascript' | 'css' | 'html' | 'sass' | 'less' | 'jsx' ;
    editable?: boolean;
    answer?: string | null;
    settings?: boolean;
}

const CodeEditor: React.FC<codeEditorProps> = ({language = 'javascript', answer,  settings = false, editable = true, children}) => {

    const { upDateHtml, updateJavascript, updateCss, updateSass,  updateInitialized, updateLess,  initialized,  htmlCode, cssCode, lessCode, javascriptCode, headCode, sassCode} = useContext(CodePlayerContext);

    
    const [code, setCode] = useState('');
    const [extensions, setExtensions] = useState<Extension[]>([]);
    const codeInitialize = children?.toString();
    const [showStack, setShowStack] = useState(settings);
    const { height, width } = useWindowDimensions();
    const containerHeight = height/1.67;
    const codeMirrorHeight = height/1.67 - 35;
    //const [sassCodeInit, setSassCodeInit] = useState(false);

    useEffect(() => {
         
         if(!initialized){
            children && setCode(codeInitialize ? codeInitialize : '');
         }
         switch (language) {
            case 'javascript': {
               setExtensions([javascript({ jsx: true })]);
               initialized && javascriptCode && setCode(javascriptCode);
               break;
            }
            case 'html': {
               setExtensions([html({ matchClosingTags: true })]);
               initialized && htmlCode && setCode(htmlCode);
               break;
            }
            case 'css': {
               setExtensions([css()]);
               initialized && cssCode && setCode(cssCode);
               break;
            }
            case 'sass': {
               setExtensions([sass()]);
               initialized && sassCode && setCode(sassCode);               
               break;
            }
            case 'less': {
               setExtensions([less()]);
               initialized && lessCode && setCode(lessCode);               
               break;
            }
            default: {
               break;
            }
         }
          answer && setShowStack(true);
          // eslint-disable-next-line
       }, []);

    const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
        console.log('value:', value);
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
            case 'sass': { 
               updateSass && updateSass(value)
              break; 
            }
            case 'less': { 
               updateLess && updateLess(value)
              break; 
            }
            default: { 
               break; 
            } 
         }
      }, [language, upDateHtml, updateCss, updateSass, updateJavascript, updateLess]);

       


      

  return (
    <Box component="section" sx={{overflow: 'hidden', minHeight: `${containerHeight}px`}}>
        
         <CodeMirror
      value={code}
      height={`${containerHeight}px`}
      width='100%'
      extensions={extensions}
      onChange={onChange}
      theme='dark'
      editable={editable}
    />
     {showStack && <StackRightBtn> {answer && <AnswerBtn language={language}>{answer}</AnswerBtn>}</StackRightBtn>}
    </Box> 
    );
};

export default CodeEditor;
